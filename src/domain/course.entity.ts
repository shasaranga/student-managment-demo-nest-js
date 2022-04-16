import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Domain } from './domain.entity';
import { User } from './user.entity';

@Entity()
export class Course extends Domain {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  mode: string;

  @ManyToOne((_type) => User, (user) => user.courses, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
