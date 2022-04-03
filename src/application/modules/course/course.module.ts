import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseService } from 'src/application/services/course/course.service';
import { CourseRepository } from 'src/persistance/repository/course.repository';
import { CourseController } from '../../../controllers/course.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CourseRepository]), AuthModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
