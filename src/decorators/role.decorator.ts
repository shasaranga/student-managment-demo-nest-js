import { SetMetadata } from '@nestjs/common';
import { User_Role } from 'src/common/enums/roles-enum';

export const ROLES_KEY = 'roles';

/**
 * This decorator allows specifying what roles are required to access specific resources.
 */
export const Roles = (...roles: User_Role[]) => SetMetadata(ROLES_KEY, roles);
