import UserRoleEntity from 'src/domain/user-role.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserRoleEntity)
export class UserRoleRepository extends Repository<UserRoleEntity> {}
