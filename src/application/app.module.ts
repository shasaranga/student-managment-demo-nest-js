import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';

@Module({
  imports: [CourseModule, AuthModule],
})
export class AppModule {}
