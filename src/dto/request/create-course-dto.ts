import { IsEnum, IsNotEmpty } from 'class-validator';
import { CourseMode } from 'src/common/enums/course-mode-enum';
import { CourseType } from 'src/common/enums/course-type-enum';

export class CreateCourseDto {
  @IsNotEmpty()
  name: string;

  @IsEnum(CourseType)
  type: string;

  @IsEnum(CourseMode)
  mode: string;
}
