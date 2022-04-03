import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/user.entity';
import { SignInDto } from 'src/dto/request/sign-in-dto';
import { SignUpDto } from 'src/dto/request/sign-up-dto';
import { UserRepository } from 'src/persistance/repository/user.repository';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepostory: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    return this.userRepostory.createUser(signUpDto);
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password } = signInDto;
    const user = await this.userRepostory.findOne({ email });

    if (user && (await bcryptjs.compare(password, user.password))) {
      const accessToken = await this.jwtService.sign(signInDto);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
