import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DomainEntity } from './domain.entity';
import UserRole from './user-role.entity';

@Entity()
export default class Role extends DomainEntity {
  // constructor(name: string) {
  //   super();
  //   this.name = name;
  // }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}
