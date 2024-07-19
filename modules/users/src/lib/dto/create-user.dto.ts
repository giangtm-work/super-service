import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength
} from 'class-validator';

const passwordRegEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsString()
  name: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have at least 3 characters.' })
  @IsAlphanumeric(undefined, {
    message: 'Username does not allow other than alpha numeric chars.'
  })
  username: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 6 and maximum 20 characters,
    at least one uppercase letter,
    one lowercase letter,
    one number and
    one special character`
  })
  password: string;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  @IsEmail(undefined, { message: 'Please provide valid Email.' })
  email: string;

  @IsOptional()
  @IsInt()
  age: number;

  @IsOptional()
  @IsEnum(['f', 'm', 'u'])
  gender = 'u';

  @IsOptional()
  @IsEnum(['2', '1', '0'])
  status = '1';
}
