import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/application/services/auth/auth.service';
import { User } from 'src/domain/user.entity';
import { SignInDto } from 'src/dto/request/sign-in-dto';
import { SignUpDto } from 'src/dto/request/sign-up-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signUp')
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signIn')
  async signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
  }
}
