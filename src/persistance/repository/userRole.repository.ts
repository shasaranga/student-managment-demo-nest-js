import UserRole from 'src/domain/user-role.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserRole)
export class UserRoleRepository extends Repository<UserRole> {}
