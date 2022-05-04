import { GetCourseByIdQueryHandler } from './course/handlers/get-course-by-id.handler';
import { GetCourseQueryHandler } from './course/handlers/get-course.handler';

export const QueryHandlersModule = [
  GetCourseQueryHandler,
  GetCourseByIdQueryHandler,
];
