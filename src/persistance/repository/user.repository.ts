import * as bcryptjs from 'bcryptjs';
import { UserEntity } from 'src/domain/user.entity';

import { SignUpDto } from 'src/dto/request/sign-up-dto';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(signUpDto: SignUpDto): Promise<UserEntity> {
    const { name, email, password } = signUpDto;

    const salt = await bcryptjs.genSalt();
    const hashPassword = await bcryptjs.hash(password, salt);
    const user = this.create({
      name,
      email,
      password: hashPassword,
    });

    try {
      return await this.save(user);
    } catch (e) {
      console.log(e);
    }
  }
}
