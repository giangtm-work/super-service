import { IsNotEmpty } from 'class-validator';

export class LoginReqDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export interface LoginResDto {
  access_token: string,
  refresh_token: string;
}
