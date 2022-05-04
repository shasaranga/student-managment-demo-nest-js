import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DomainEntity } from './domain.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'course' })
export class CourseEntity extends DomainEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  readonly name: string;

  @Column()
  readonly type: string;

  @Column()
  readonly mode: string;

  @ManyToOne((_type) => UserEntity, (user) => user.courses, { eager: false })
  @Exclude({ toPlainOnly: true })
  readonly user: UserEntity;
}
