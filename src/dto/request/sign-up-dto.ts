import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserTypes } from 'src/common/enums/user-types.enum';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(UserTypes)
  userType: UserTypes;
}
