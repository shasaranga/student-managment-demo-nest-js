import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/domain/user.entity';

import { JwtPayload } from 'src/dto/jwt-payload.interface';

import { UserRepository } from 'src/persistance/repository/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    /**
     * https://docs.nestjs.com/security/authentication#implementing-passport-jwt
     *
     * for more option info
     * https://github.com/mikenicholson/passport-jwt#configure-strategy
     */
    super({
      secretOrKey: 'topSecret51',
      ignoreExpiration: true,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<UserEntity> {
    const { email } = payload;
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
