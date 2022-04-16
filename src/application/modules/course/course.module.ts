import { Module } from '@nestjs/common';
import { CourseService } from 'src/application/services/course/course.service';
import { PersistanceModule } from 'src/persistance/persistance.module';
import { CourseController } from '../../../controllers/course.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, PersistanceModule],
  controllers: [CourseController],
  providers: [
    CourseService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class CourseModule {}
