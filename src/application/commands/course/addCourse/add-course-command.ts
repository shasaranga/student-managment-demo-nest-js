import { ICommand } from '@nestjs/cqrs';
import { UserEntity } from 'src/domain/user.entity';

export class AddCourseCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly type: string,
    public readonly mode: string,
    public readonly user: UserEntity,
  ) {}
}
