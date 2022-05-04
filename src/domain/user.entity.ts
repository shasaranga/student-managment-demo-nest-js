import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';
import { DomainEntity } from './domain.entity';
import UserRole from './user-role.entity';

@Entity({ name: 'user' })
export class UserEntity extends DomainEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  readonly name: string;

  @Column()
  readonly email: string;

  @Column()
  readonly password: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user, { cascade: true })
  readonly userRoles: UserRole[];

  //eager set to true because whenever a user is retireved it automatically
  // retrieves the tasks related to that user
  @OneToMany(() => CourseEntity, (courseEntity) => courseEntity.user, {
    eager: true,
  })
  readonly courses: CourseEntity[];

  constructor(id: string, name: string, email: string, password: string) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
