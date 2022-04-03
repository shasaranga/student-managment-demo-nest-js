import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Domain } from './domain.entity';
import Role from './role.entity';
import { User } from './user.entity';

@Entity()
export default class UserRole extends Domain {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  roleId: string;

  @ManyToOne(() => User, (user) => user.userRoles)
  user: User;

  @ManyToOne(() => Role, (role) => role.userRoles)
  role: Role;
}
