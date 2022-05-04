import { AddCourseCommandHandler } from './addCourse/add-course-command.handler';
import { DeleteCourseCommandHandler } from './deleteCourse/delete-course.handler';
import { UpdateCourseCommandHandler } from './updateCourse/update-course.handler';

export const CourseHandlers = [
  AddCourseCommandHandler,
  UpdateCourseCommandHandler,
  DeleteCourseCommandHandler,
];
