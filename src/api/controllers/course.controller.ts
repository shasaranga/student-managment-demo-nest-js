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
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AddCourseCommand } from 'src/application/commands/course/addCourse/add-course-command';
import { DeleteCourseCommand } from 'src/application/commands/course/deleteCourse/delete-course-command';
import { UpdateCourseCommand } from 'src/application/commands/course/updateCourse/update-course-command';
import { GetCourseByIdQuery } from 'src/application/queries/course/get-course-by-id.query';
import { GetCourseQuery } from 'src/application/queries/course/get-course.query';
import { CourseService } from 'src/application/services/course/course.service';
import { User_Role } from 'src/common/enums/roles-enum';
import { CourseEntity } from 'src/domain/course.entity';
import { UserEntity } from 'src/domain/user.entity';
import { CreateCourseDto } from 'src/dto/request/create-course-dto';
import { FilterCourseDto } from 'src/dto/request/filter-course-dto';
import { UpdateCourseInfo } from 'src/dto/request/update-course-info-dto';
import { GetUser } from '../decorators/get-user.decorator';
import { Roles } from '../decorators/role.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

@Controller('course')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CourseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly courseService: CourseService,
  ) {}

  @Post()
  @Roles(User_Role.SUPER_ADMIN, User_Role.ADMIN)
  async addNewCourse(
    @Body() createCourseDto: CreateCourseDto,
    @GetUser() user: UserEntity,
  ): Promise<CourseEntity> {
    const { name, type, mode } = createCourseDto;
    return this.commandBus.execute(
      new AddCourseCommand(name, type, mode, user),
    );
  }

  @Get()
  @Roles(User_Role.ADMIN, User_Role.SUPER_ADMIN)
  async getCourses(
    @Query() filterCourseDto: FilterCourseDto,
  ): Promise<CourseEntity[]> {
    const { type, mode, search } = filterCourseDto;
    return this.queryBus.execute(new GetCourseQuery(type, mode, search));
  }

  /**
   * the ParseUUIDPipe converts the string param to check for UUID format
   * we can specify a version if needed by passing an option object
   * for more : https://docs.nestjs.com/pipes
   * @param id
   * @returns Promise<Course>
   */
  @Get('/:id')
  @Roles(User_Role.ADMIN, User_Role.SUPER_ADMIN, User_Role.STUDENT)
  async getCourseById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<CourseEntity> {
    return this.queryBus.execute(new GetCourseByIdQuery(id));
  }

  @Patch('/:id')
  @Roles(User_Role.ADMIN, User_Role.SUPER_ADMIN)
  async updateCourseInfo(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCourseInfo: UpdateCourseInfo,
  ): Promise<void> {
    return this.commandBus.execute(
      new UpdateCourseCommand(id, updateCourseInfo),
    );
  }

  @Delete('/:id')
  @Roles(User_Role.ADMIN, User_Role.SUPER_ADMIN)
  async deleteCourseById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.commandBus.execute(new DeleteCourseCommand(id));
  }
}
