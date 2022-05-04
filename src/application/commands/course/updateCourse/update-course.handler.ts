import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CourseService } from 'src/application/services/course/course.service';
import { UpdateCourseCommand } from './update-course-command';

@CommandHandler(UpdateCourseCommand)
export class UpdateCourseCommandHandler
  implements ICommandHandler<UpdateCourseCommand>
{
  constructor(private readonly courseService: CourseService) {}
  async execute(command: UpdateCourseCommand): Promise<void> {
    return this.courseService.updateCourseInfo(command.id, command.updatedInfo);
  }
}
