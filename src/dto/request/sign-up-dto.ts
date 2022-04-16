import {
  ArrayNotEmpty,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { User_Role } from 'src/common/enums/roles-enum';

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

  @ArrayNotEmpty()
  @IsEnum(User_Role, { each: true })
  roles: User_Role[];
}
