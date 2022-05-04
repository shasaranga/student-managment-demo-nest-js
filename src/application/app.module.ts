import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';

@Module({
  imports: [AuthModule, CourseModule],
})
export class AppModule {}
