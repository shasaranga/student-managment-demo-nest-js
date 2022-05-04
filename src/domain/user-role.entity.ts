import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DomainEntity } from './domain.entity';
import Role from './role.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'user_role' })
export default class UserRoleEntity extends DomainEntity {
  constructor(user: UserEntity, role: Role) {
    super();
    this.user = user;
    this.role = role;
  }
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('uuid')
  readonly userId: string;

  @Column('uuid')
  readonly roleId: string;

  // when user is deleted user_role record is deleted automatically
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.userRoles, {
    onDelete: 'CASCADE',
  })
  readonly user: UserEntity;

  @ManyToOne(() => Role, (role) => role.userRoles)
  readonly role: Role;
}
