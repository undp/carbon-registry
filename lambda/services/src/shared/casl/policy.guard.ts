import { CanActivate, ExecutionContext, Injectable, mixin } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { EntitySubject } from "../entities/entity.subject";
import { User } from "../entities/user.entity";
import { Action } from "./action.enum";
import { CaslAbilityFactory, AppAbility } from "./casl-ability.factory";
import { CHECK_POLICIES_KEY } from "./policy.decorator";
import { PolicyHandler } from "./policy.handler";
const { rulesToQuery } = require('@casl/ability/extra');
const mongoToSqlConverter = require("mongo-to-sql-converter")

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    public reflector: Reflector,
    public caslAbilityFactory: CaslAbilityFactory,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const { user, body } = context.switchToHttp().getRequest();
    const ability = this.caslAbilityFactory.createForUser(user);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability, body),
    );
  }

  public execPolicyHandler(handler: PolicyHandler, ability: AppAbility, body: any) {
    if (typeof handler === 'function') {
      return handler(ability, body);
    }
    return handler.handle(ability, body);
  }
}

export const PoliciesGuardEx = (injectQuery: boolean, action?: Action, subject?:typeof EntitySubject, onlyInject?: boolean) => {

  @Injectable()
  class PoliciesGuardMixin implements CanActivate {
    constructor(
      public reflector: Reflector,
      public caslAbilityFactory: CaslAbilityFactory,
    ) { }

    parseMongoQueryToSQL(mongoQuery, isNot = false, key = undefined) {
      let final = undefined;
      for (let operator in mongoQuery) {
        if (operator.startsWith("$")) {
          if (operator == "$and" || operator == "$or") {
            const val = mongoQuery[operator].map( st => this.parseMongoQueryToSQL(st)).join(` ${operator.replace("$", '')} `)
            final = final == undefined ? val : `${final} and ${val}`
          } else if (operator == "$not") {
            return this.parseMongoQueryToSQL(mongoQuery["$not"], !isNot)
          } else if (operator == "$eq") {
            const value = (typeof mongoQuery["$eq"] === "number") ? String(mongoQuery["$eq"]) : `'${mongoQuery["$eq"]}'`
            return `"${key}" ${ isNot ? "!=" : "=" } ${value}`
          } else if (operator == "$ne") {
            const value = (typeof mongoQuery["$ne"] === "number") ? String(mongoQuery["$ne"]) : `'${mongoQuery["$ne"]}'`
            return `"${key}" ${ isNot ? "=" : "!=" } ${value}`
          }
        } else {
          return this.parseMongoQueryToSQL(mongoQuery[operator], isNot, operator)
        }
      }
      return final;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const policyHandlers =
        this.reflector.get<PolicyHandler[]>(
          CHECK_POLICIES_KEY,
          context.getHandler(),
        ) || [];

      const { user, body } = context.switchToHttp().getRequest();
      const ability = this.caslAbilityFactory.createForUser(user);

      if (injectQuery) {
        context.switchToHttp().getRequest()['ability'] = ability;

        const mongoQuery = JSON.stringify(rulesToQuery(ability, action, subject, rule => {
          return rule.inverted ? { $not: rule.conditions } : rule.conditions
        }))
        console.log(JSON.stringify(mongoQuery))
      
        if (mongoQuery && mongoQuery != "" && mongoQuery != "{}" && mongoQuery != '{"$or":[{}]}') {
          const whereQuery = this.parseMongoQueryToSQL(JSON.parse(mongoQuery));
          console.log("Where", whereQuery)
          context.switchToHttp().getRequest()['abilityCondition'] = whereQuery;
        }
      }
      
      if (policyHandlers.length == 0 && action && subject && !onlyInject) {
        const obj = Object.assign(new subject(), body);
        if (action == Action.Update) {
          for (const key in obj) {
            if(!ability.can(action, obj, key)) {
              return false
            }
          }  
        } else if (action == Action.Delete) {
          return ability.can(action, subject)
        }
        else {
          return ability.can(action, obj)
        }
      }

      return policyHandlers.every((handler) =>
        this.execPolicyHandler(handler, ability, body),
      );
    }

    public execPolicyHandler(handler: PolicyHandler, ability: AppAbility, body: any) {
      if (typeof handler === 'function') {
        return handler(ability, body);
      }
      return handler.handle(ability, body);
    }
  }

  const guard = mixin(PoliciesGuardMixin);
  return guard;
}



