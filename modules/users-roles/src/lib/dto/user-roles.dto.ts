import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UserRolesDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  roleIds: string[];
}
