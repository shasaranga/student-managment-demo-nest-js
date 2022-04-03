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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CourseService } from 'src/application/services/course/course.service';
import { Role } from 'src/common/enums/roles-enum';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Course } from 'src/domain/course.entity';
import { CreateCourseDto } from 'src/dto/request/create-course-dto';
import { FilterCourseDto } from 'src/dto/request/filter-course-dto';
import { UpdateCourseInfo } from 'src/dto/request/update-course-info-dto';

@Controller('course')
@UseGuards(AuthGuard())
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post()
  async addNewCourse(
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<Course> {
    return this.courseService.createCourse(createCourseDto);
  }

  // getAll
  // filters: type / model
  @Roles(Role.ADMIN)
  @Get()
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
  async getCourseById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user,
  ): Promise<Course> {
    console.log(user);
    return this.courseService.geCourseById(id);
  }

  @Patch('/:id')
  async updateCourseInfo(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCourseInfo: UpdateCourseInfo,
  ): Promise<void> {
    return this.courseService.updateCourseInfo(id, updateCourseInfo);
  }

  @Delete('/:id')
  async deleteCourseById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.courseService.deleteCourseById(id);
  }
}
