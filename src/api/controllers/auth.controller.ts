import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import LoginCommand from 'src/application/commands/auth/login/login.command';
import { SignupCommand } from 'src/application/commands/auth/signup/signup-command';
import { BaseResponse } from 'src/dto/reponse/base-response-dto';
import { SignInDto } from 'src/dto/request/sign-in-dto';
import { SignUpDto } from 'src/dto/request/sign-up-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/signIn')
  async signIn(@Body() signInDto: SignInDto): Promise<BaseResponse> {
    const { email, password } = signInDto;
    return this.commandBus.execute(new LoginCommand(email, password));
  }

  @Post('/signUp')
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    const { email, name, password, roles } = signUpDto;
    return this.commandBus.execute(
      new SignupCommand(name, email, password, roles),
    );
  }
}
