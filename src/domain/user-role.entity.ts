import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Domain } from './domain.entity';
import Role from './role.entity';
import { User } from './user.entity';

@Entity()
export default class UserRole extends Domain {
  constructor(user: User, role: Role) {
    super();
    this.user = user;
    this.role = role;
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  roleId: string;

  // when user is deleted user_role record is deleted automatically
  @ManyToOne(() => User, (user) => user.userRoles, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Role, (role) => role.userRoles)
  role: Role;
}
