import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CourseController } from 'src/api/controllers/course.controller';
import { CourseHandlers } from 'src/application/commands/course/courseHandlers.module';
import { QueryHandlersModule } from 'src/application/queries/queryHandlers.module';
import { CourseService } from 'src/application/services/course/course.service';
import { PersistanceModule } from 'src/persistance/persistance.module';
import { AuthModule } from '../auth/auth.module';

const CommandHandlers = [...CourseHandlers];
const QueryHandlers = [...QueryHandlersModule];
@Module({
  imports: [CqrsModule, AuthModule, PersistanceModule],
  controllers: [CourseController],
  providers: [
    CourseService,
    ...CommandHandlers,
    ...QueryHandlers,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class CourseModule {}
