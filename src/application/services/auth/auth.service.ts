import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import Role from 'src/domain/role.entity';
import UserRoleEntity from 'src/domain/user-role.entity';
import { SignUpDto } from 'src/dto/request/sign-up-dto';
import UserContext from 'src/dto/user-context.interface';
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

    const userRoles: Array<UserRoleEntity> = [];
    relatedRoles.forEach((role) => {
      const userRole = new UserRoleEntity(savedUser, role);
      userRoles.push(userRole);
    });
    await this.userRoleRepository.save(userRoles);
  }

  async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcryptjs.compare(password, hashPassword);
  }

  async getAccessToken(data: UserContext): Promise<string> {
    return await this.jwtService.sign(data);
  }
}
