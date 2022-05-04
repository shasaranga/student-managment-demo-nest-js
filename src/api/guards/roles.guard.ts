import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User_Role } from 'src/common/enums/roles-enum';
import { RoleRepository } from 'src/persistance/repository/role.repository';
import { UserRoleRepository } from 'src/persistance/repository/userRole.repository';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(RoleRepository) private roleRepository: RoleRepository,
    @InjectRepository(UserRoleRepository)
    private userRoleRepository: UserRoleRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<User_Role[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const userRolesIds = (
      await this.userRoleRepository.find({
        where: { userId: user.id },
      })
    ).map((userRole) => userRole.roleId);

    const roleIds = await Promise.all(
      requiredRoles.map(async (roleName) => {
        return await this.roleRepository.getRoleIdByRoleName(roleName);
      }),
    );

    return roleIds.some((id) => userRolesIds.includes(id));
  }
}
