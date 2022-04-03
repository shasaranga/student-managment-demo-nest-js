import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CourseMode } from 'src/common/enums/course-mode-enum';
import { CourseType } from 'src/common/enums/course-type-enum';

export class UpdateCourseInfo {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(CourseMode)
  mode: CourseMode;

  @IsOptional()
  @IsEnum(CourseType)
  type: CourseType;
}
