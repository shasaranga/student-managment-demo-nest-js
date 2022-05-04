import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CourseService } from 'src/application/services/course/course.service';
import { CourseEntity } from 'src/domain/course.entity';
import { GetCourseByIdQuery } from '../get-course-by-id.query';

@QueryHandler(GetCourseByIdQuery)
export class GetCourseByIdQueryHandler
  implements IQueryHandler<GetCourseByIdQuery>
{
  constructor(private readonly courseService: CourseService) {}
  async execute(query: GetCourseByIdQuery): Promise<CourseEntity> {
    return this.courseService.geCourseById(query.id);
  }
}
