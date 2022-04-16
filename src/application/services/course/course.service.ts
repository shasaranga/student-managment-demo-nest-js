import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/domain/course.entity';
import { CreateCourseDto } from 'src/dto/request/create-course-dto';
import { FilterCourseDto } from 'src/dto/request/filter-course-dto';
import { UpdateCourseInfo } from 'src/dto/request/update-course-info-dto';
import { CourseRepository } from 'src/persistance/repository/course.repository';


@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
  ) {}

  createCourse(courseCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseRepository.createCourse(courseCourseDto);
  }

  getCourses(filterCourseDto: FilterCourseDto): Promise<Course[]> {
    return this.courseRepository.getCourses(filterCourseDto);
  }

  async geCourseById(id: string): Promise<Course> {
    const found = await this.courseRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Course with ID "${id}" not found`);
    }
    return found;
  }

  async updateCourseInfo(
    id: string,
    updateCourseInfo: UpdateCourseInfo,
  ): Promise<void> {
    // updates only the fields that changed
    const result = await this.courseRepository.update(id, updateCourseInfo);
    if (result.affected === 0) {
      throw new NotFoundException(`Course with ID "${id}" not found`);
    }
  }

  async deleteCourseById(id: string): Promise<void> {
    const result = await this.courseRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Course with ID "${id}" not found`);
    }
  }
}
