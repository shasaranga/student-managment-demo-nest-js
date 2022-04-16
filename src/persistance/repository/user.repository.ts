import { User } from 'src/domain/user.entity';
import { SignUpDto } from 'src/dto/request/sign-up-dto';
import { EntityRepository, Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(signUpDto: SignUpDto): Promise<User> {
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
