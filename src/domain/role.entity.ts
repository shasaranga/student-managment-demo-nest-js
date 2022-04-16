import { Column, PrimaryGeneratedColumn, OneToMany, Entity } from 'typeorm';
import { Domain } from './domain.entity';
import UserRole from './user-role.entity';

@Entity()
export default class Role extends Domain {
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
