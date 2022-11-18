import { AbilityBuilder, AbilityClass, CreateAbility, createMongoAbility, ExtractSubjectType, InferSubjects, MongoAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { Action } from "./action.enum";
import { Role } from "./role.enum";
import { EntitySubject } from "../entities/entity.subject";

type Subjects = InferSubjects<typeof EntitySubject> | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder(createAppAbility);

    if (user) {
      switch(user.role) {
        case Role.Root:
          can(Action.Manage, 'all');
          break;
        case Role.Admin:
          can(Action.Manage, User, { role: { $nin: [Role.Root] }});
          break;
        case Role.NationalAdmin:
          can(Action.Manage, User, { role: { $in: [Role.NationalAdmin, Role.NationalGeneral, Role.NationalView] }});
          break;
        default:
          cannot(Action.Update, User, ['email', 'role']);
          can([Action.Update, Action.Read], User, { id: user.id })
      }
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}