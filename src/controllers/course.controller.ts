import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { CourseService } from 'src/application/services/course/course.service';
import { User_Role } from 'src/common/enums/roles-enum';
import { Roles } from 'src/decorators/role.decorator';
import { Course } from 'src/domain/course.entity';
import { CreateCourseDto } from 'src/dto/request/create-course-dto';
import { FilterCourseDto } from 'src/dto/request/filter-course-dto';
import { UpdateCourseInfo } from 'src/dto/request/update-course-info-dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('course')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post()
  @Roles(User_Role.ADMIN, User_Role.SUPER_ADMIN)
  async addNewCourse(
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<Course> {
    return this.courseService.createCourse(createCourseDto);
  }

  @Get()
  @Roles(User_Role.ADMIN, User_Role.SUPER_ADMIN)
  async getCourses(
    @Query() filterCourseDto: FilterCourseDto,
  ): Promise<Course[]> {
    return this.courseService.getCourses(filterCourseDto);
  }

  /**
   * the ParseUUIDPipe converts the string param to check for UUID format
   * we can specify a version if needed by passing an option object
   * for more : https://docs.nestjs.com/pipes
   * @param id
   * @returns Promise<Course>
   */
  @Get('/:id')
  @Roles(User_Role.ADMIN, User_Role.SUPER_ADMIN)
  async getCourseById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Course> {
    return this.courseService.geCourseById(id);
  }

  @Patch('/:id')
  @Roles(User_Role.ADMIN, User_Role.SUPER_ADMIN)
  async updateCourseInfo(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCourseInfo: UpdateCourseInfo,
  ): Promise<void> {
    return this.courseService.updateCourseInfo(id, updateCourseInfo);
  }

  @Delete('/:id')
  @Roles(User_Role.ADMIN, User_Role.SUPER_ADMIN)
  async deleteCourseById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.courseService.deleteCourseById(id);
  }
}
