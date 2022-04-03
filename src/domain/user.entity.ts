import { Domain } from './domain.entity';
import { UserTypes } from 'src/common/enums/user-types.enum';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from 'src/common/enums/roles-enum';
import UserRole from './user-role.entity';

@Entity()
export class User extends Domain {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];
}
