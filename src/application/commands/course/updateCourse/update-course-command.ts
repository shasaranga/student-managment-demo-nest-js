import { ICommand } from '@nestjs/cqrs';
import { UpdateCourseInfo } from 'src/dto/request/update-course-info-dto';

export class UpdateCourseCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly updatedInfo: UpdateCourseInfo,
  ) {}
}
