import UserRoleEntity from 'src/domain/user-role.entity';

export class UserRoleSavedEvent {
  constructor(public readonly userRole: UserRoleEntity) {}
}
