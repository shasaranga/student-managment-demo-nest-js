import { ICommand } from '@nestjs/cqrs';

export default class LoginCommand implements ICommand {
  constructor(public email: string, public password: string) {}
}
