import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';
import { Domain } from './domain.entity';
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

  @OneToMany(() => UserRole, (userRole) => userRole.user, { cascade: true })
  userRoles: UserRole[];

  //eager set to true because whenever a user is retireved it automatically
  // retrieves the tasks related to that user
  @OneToMany(() => Course, (course) => course.user, { eager: true })
  courses: Course[];
}
