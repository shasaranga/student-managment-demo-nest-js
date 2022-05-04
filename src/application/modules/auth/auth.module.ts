import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/api/controllers/auth.controller';
import { AuthHandlerModule } from 'src/application/commands/auth/authHandlers.module';
import { AuthEventHandlers } from 'src/application/events/authEventHandlers.module';
import { AuthService } from 'src/application/services/auth/auth.service';
import { PersistanceModule } from 'src/persistance/persistance.module';
import { JwtStrategy } from './jwt-strategy';

/**
 * This module contains all the auth related componenets.
 */

const CommandHandlers = [...AuthHandlerModule];
const EventsHandlers = [...AuthEventHandlers];
@Module({
  imports: [
    CqrsModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: 'topSecret51',
        signOptions: {
          expiresIn: configService.get<number>('JWT_EXPIRATION_SECONDS'), //1 hour
        },
      }),
    }),
    PersistanceModule,
  ],
  controllers: [AuthController],
  providers: [
    Logger,
    AuthService,
    JwtStrategy,
    ...CommandHandlers,
    ...EventsHandlers,
  ],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
