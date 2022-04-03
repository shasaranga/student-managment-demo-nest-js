import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/common/enums/roles-enum';

export const ROLES_KEY = 'roles';

/**
 * This decorator allows specifying what roles are required to access specific resources.
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
