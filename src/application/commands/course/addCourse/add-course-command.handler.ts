import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from 'src/persistance/repository/course.repository';
import { AddCourseCommand } from './add-course-command';

@CommandHandler(AddCourseCommand)
export class AddCourseCommandHandler
  implements ICommandHandler<AddCourseCommand>
{
  constructor(
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
  ) {}
  async execute(command: AddCourseCommand): Promise<any> {
    const { mode, name, type, user } = command;
    return this.courseRepository.createCourse({ mode, name, type }, user);
  }
}
