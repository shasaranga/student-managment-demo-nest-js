import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/application/services/auth/auth.service';
import { AuthController } from 'src/controllers/auth.controller';
import { PersistanceModule } from 'src/persistance/persistance.module';
import { RoleRepository } from 'src/persistance/repository/role.repository';
import { UserRepository } from 'src/persistance/repository/user.repository';
import { UserRoleRepository } from 'src/persistance/repository/userRole.repository';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600, //1 hour
      },
    }),
    PersistanceModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
