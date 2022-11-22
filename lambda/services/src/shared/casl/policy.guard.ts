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

export const PoliciesGuardEx = (injectQuery: boolean, action: Action, subject:typeof EntitySubject) => {

  @Injectable()
  class PoliciesGuardMixin implements CanActivate {
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

      if (injectQuery) {
        context.switchToHttp().getRequest()['ability'] = ability;

        const mongoQuery = JSON.stringify(rulesToQuery(ability, action, subject, rule => rule.inverted ? { $not: rule.conditions } : rule.conditions))
        if (mongoQuery && mongoQuery != "" && mongoQuery != "{}" && mongoQuery != '{"$or":[{}]}') {
          const query = mongoToSqlConverter.convertToSQL(`db.temp.find(${mongoQuery})`, true);
          const where = query.split(' WHERE ')[1].replace('(', '').replace(');', '')
          context.switchToHttp().getRequest()['abilityCondition'] = where;
        }
      }
      
      if (policyHandlers.length == 0 && action && subject) {
        const obj = Object.assign(new subject(), body);
        if (obj instanceof User) {
          obj['role'] == undefined ? obj['role'] = user.role : ""
          obj['id'] ==  undefined ? obj['id'] = user.id : ""
        }
        if (action == Action.Update) {
          
          for (const key in obj) {
            if(!ability.can(action, obj, key)) {
              if (key == 'role' && obj['role'] == user.role) {
                continue;
              }
              console.log('Returned due to ', key)
              return false
            }
          }  
        } 
        else {
          console.log(JSON.stringify(ability.rules))
          console.log('Obj can', obj)
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



