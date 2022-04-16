import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import Role from 'src/domain/role.entity';
import UserRole from 'src/domain/user-role.entity';
import { SignInDto } from 'src/dto/request/sign-in-dto';
import { SignUpDto } from 'src/dto/request/sign-up-dto';
import { RoleRepository } from 'src/persistance/repository/role.repository';
import { UserRepository } from 'src/persistance/repository/user.repository';
import { UserRoleRepository } from 'src/persistance/repository/userRole.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepostory: UserRepository,
    @InjectRepository(RoleRepository) private roleRepository: RoleRepository,
    @InjectRepository(UserRoleRepository)
    private userRoleRepository: UserRoleRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { roles } = signUpDto;
    const relatedRoles: Role[] = [];
    for (const userRole of roles) {
      const role = await this.roleRepository.findOne({ name: userRole });
      if (!role) {
        throw new NotFoundException(`Role not found with name "${userRole}"`);
      }
      relatedRoles.push(role);
    }
    const savedUser = await this.userRepostory.createUser(signUpDto);

    const userRoles: Array<UserRole> = [];
    relatedRoles.forEach((role) => {
      const userRole = new UserRole(savedUser, role);
      userRoles.push(userRole);
    });
    await this.userRoleRepository.save(userRoles);
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
