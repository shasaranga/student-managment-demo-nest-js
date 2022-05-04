import { CourseEntity } from 'src/domain/course.entity';
import { UserEntity } from 'src/domain/user.entity';
import { CreateCourseDto } from 'src/dto/request/create-course-dto';
import { FilterCourseDto } from 'src/dto/request/filter-course-dto';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CourseEntity)
export class CourseRepository extends Repository<CourseEntity> {
  async createCourse(
    createCourseDto: CreateCourseDto,
    user: UserEntity,
  ): Promise<CourseEntity> {
    const { name, type, mode } = createCourseDto;

    const course = this.create({
      name,
      type,
      mode,
      user,
    });
    await this.save(course);
    return course;
  }

  async getCourses(filterCourseDto: FilterCourseDto): Promise<CourseEntity[]> {
    const { type, mode, search } = filterCourseDto;

    const query = this.createQueryBuilder('course');

    if (type) {
      query.andWhere('course.type = :type', { type });
    }

    if (mode) {
      query.andWhere('course.mode = :mode', { mode });
    }

    if (search) {
      query.andWhere('LOWER(course.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }
    return await query.getMany();
  }
}
