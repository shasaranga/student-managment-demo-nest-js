import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserLoggedInEvent } from 'src/application/events/auth/login/user-logged-in.event';
import { AuthService } from 'src/application/services/auth/auth.service';
import { UserEntity } from 'src/domain/user.entity';
import { BaseResponse } from 'src/dto/reponse/base-response-dto';
import LoginResponse from 'src/dto/reponse/login-response.dto';
import { UserRepository } from 'src/persistance/repository/user.repository';
import LoginCommand from './login.command';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: LoginCommand): Promise<BaseResponse> {
    const { email, password } = command;
    let user = await this.userRepository.findOne({ email });

    if (
      user &&
      (await this.authService.comparePassword(password, user.password))
    ) {
      // associating the found user model and the publisher
      user = this.eventPublisher.mergeObjectContext(user);
      const accessToken = await this.authService.getAccessToken({
        email,
        userId: user.id,
      });
      this.dispatchLoggedInEvent(user);
      return new LoginResponse({ userId: user.id, accessToken: accessToken });
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  dispatchLoggedInEvent(user: UserEntity): void {
    user.apply(new UserLoggedInEvent(user.email, new Date()));
    user.commit();
  }
}
