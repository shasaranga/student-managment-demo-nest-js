import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CourseService } from 'src/application/services/course/course.service';
import { CourseEntity } from 'src/domain/course.entity';
import { GetCourseQuery } from '../get-course.query';

@QueryHandler(GetCourseQuery)
export class GetCourseQueryHandler implements IQueryHandler<GetCourseQuery> {
  constructor(private readonly courseService: CourseService) {}
  async execute(query: GetCourseQuery): Promise<CourseEntity[]> {
    return this.courseService.getCourses({ ...query });
  }
}
