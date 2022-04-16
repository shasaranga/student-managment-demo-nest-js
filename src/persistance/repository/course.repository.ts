import { Course } from 'src/domain/course.entity';
import { CreateCourseDto } from 'src/dto/request/create-course-dto';
import { FilterCourseDto } from 'src/dto/request/filter-course-dto';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {
  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const { name, type, mode } = createCourseDto;

    const course = this.create({
      name,
      type,
      mode,
    });
    await this.save(course);
    return course;
  }

  async getCourses(filterCourseDto: FilterCourseDto): Promise<Course[]> {
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
