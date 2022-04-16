import Role from 'src/domain/role.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  async getRoleIdByRoleName(name: string): Promise<string> {
    const role = await this.createQueryBuilder('role')
      .where('role.name = :name', { name })
      .getOne();
    return role.id;
  }
}
