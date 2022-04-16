import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRepository } from './repository/course.repository';
import { RoleRepository } from './repository/role.repository';
import { UserRepository } from './repository/user.repository';
import { UserRoleRepository } from './repository/userRole.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      RoleRepository,
      UserRoleRepository,
      CourseRepository,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class PersistanceModule {}
