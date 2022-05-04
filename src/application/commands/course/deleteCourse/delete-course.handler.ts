import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CourseService } from 'src/application/services/course/course.service';
import { DeleteCourseCommand } from './delete-course-command';

@CommandHandler(DeleteCourseCommand)
export class DeleteCourseCommandHandler
  implements ICommandHandler<DeleteCourseCommand>
{
  constructor(private readonly courseService: CourseService) {}
  execute(command: DeleteCourseCommand): Promise<void> {
    return this.courseService.deleteCourseById(command.id);
  }
}
