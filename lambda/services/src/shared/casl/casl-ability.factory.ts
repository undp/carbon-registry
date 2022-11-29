import { AbilityBuilder, CreateAbility, createMongoAbility, ExtractSubjectType, InferSubjects, MongoAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { Action } from "./action.enum";
import { Role } from "./role.enum";
import { EntitySubject } from "../entities/entity.subject";
import { Project } from "../entities/project.entity";
import { ProjectStatus } from "../project-ledger/project-status.enum";

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
          cannot(Action.Update, User, ['role', 'apiKey', 'password']);
          break;
        case Role.Admin:
          can(Action.Manage, 'all', { role: { $ne: Role.Root }});
          cannot(Action.Update, User, ['role', 'apiKey', 'password']);
          break;
        case Role.Api:
          can([Action.Create, Action.Read], Project);
          cannot(Action.Update, User, ['email', 'role', 'apiKey', 'password']);
          break;
        case Role.General:
        case Role.ViewOnly:
          can(Action.Read, Project);
          can([Action.Update, Action.Read], User, { id: { $eq: user.id }})
          cannot(Action.Update, User, ['email', 'role', 'apiKey', 'password']);
          break;
        case Role.Certifier:
          can(Action.Read, Project, { status: { $in: [ ProjectStatus.AUTHORIZED, ProjectStatus.RETIRED ]}});
          can([Action.Update, Action.Read], User, { id: { $eq: user.id }})
          cannot(Action.Update, User, ['email', 'role', 'apiKey', 'password']);
          break;
        case Role.ProjectDeveloper:
          can(Action.Read, Project, { status: { $eq: ProjectStatus.AUTHORIZED }});
          can([Action.Update, Action.Read], User, { id: { $eq: user.id }})
          cannot(Action.Update, User, ['email', 'role', 'apiKey', 'password']);
          break;
        default:
          can([Action.Update, Action.Read], User, { id: { $eq: user.id }})
          cannot(Action.Update, User, ['email', 'role', 'apiKey', 'password']);
          break;
      }
      cannot(Action.Delete, User, { id: { $eq: user.id }})
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
