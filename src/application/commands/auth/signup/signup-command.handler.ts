import { NotFoundException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from 'src/application/events/auth/signup/user-created.event';
import { UserRoleSavedEvent } from 'src/application/events/auth/signup/user-roles-saved.event';
import Role from 'src/domain/role.entity';
import UserRoleEntity from 'src/domain/user-role.entity';
import { UserEntity } from 'src/domain/user.entity';

import { RoleRepository } from 'src/persistance/repository/role.repository';
import { UserRepository } from 'src/persistance/repository/user.repository';
import { UserRoleRepository } from 'src/persistance/repository/userRole.repository';

import { SignupCommand } from './signup-command';

@CommandHandler(SignupCommand)
export class SignUpCommandHandler implements ICommandHandler<SignupCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly userRoleRepository: UserRoleRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: SignupCommand): Promise<void> {
    const { roles } = command;
    const relatedRoles: Role[] = [];
    for (const userRole of roles) {
      const role = await this.roleRepository.findOne({ name: userRole });
      if (!role) {
        throw new NotFoundException(`Role not found with name "${userRole}"`);
      }
      relatedRoles.push(role);
    }
    const savedUser = this.eventPublisher.mergeObjectContext(
      await this.userRepository.createUser(command),
    );

    this.dispatchUserCreatedEvent(savedUser);

    const userRoles: Array<UserRoleEntity> = [];
    relatedRoles.forEach((role) => {
      const userRole = new UserRoleEntity(savedUser, role);
      userRoles.push(userRole);
    });

    // can save multiple at once using .save()
    // await this.userRoleRepository.save(userRoles)

    this.saveUserRelatedRolesAndDispatchEvent(userRoles);
  }

  dispatchUserCreatedEvent(user: UserEntity): void {
    user.apply(new UserCreatedEvent(user.id));
    user.commit();
  }

  async saveUserRelatedRolesAndDispatchEvent(
    userRoles: UserRoleEntity[],
  ): Promise<void> {
    userRoles.forEach(async (userRole) => {
      const user_role = this.eventPublisher.mergeObjectContext(
        await this.userRoleRepository.save(userRole),
      );
      user_role.apply(new UserRoleSavedEvent(userRole));
      user_role.commit();
    });
  }
}
