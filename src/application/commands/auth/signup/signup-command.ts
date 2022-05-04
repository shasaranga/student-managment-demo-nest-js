import { ICommand } from '@nestjs/cqrs';
import { User_Role } from 'src/common/enums/roles-enum';

export class SignupCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly roles: User_Role[],
  ) {}
}
