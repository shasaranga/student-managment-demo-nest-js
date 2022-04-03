import { IsEnum, IsOptional } from 'class-validator';
import { CourseMode } from 'src/common/enums/course-mode-enum';
import { CourseType } from 'src/common/enums/course-type-enum';

export class FilterCourseDto {
  @IsOptional()
  @IsEnum(CourseType)
  type: CourseType;

  @IsOptional()
  @IsEnum(CourseMode)
  mode: CourseMode;

  @IsOptional()
  search: string;
}
