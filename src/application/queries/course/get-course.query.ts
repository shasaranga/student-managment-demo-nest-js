import { CourseMode } from 'src/common/enums/course-mode-enum';
import { CourseType } from 'src/common/enums/course-type-enum';

export class GetCourseQuery {
  constructor(
    public readonly type: CourseType,
    public readonly mode: CourseMode,
    public readonly search: string,
  ) {}
}
