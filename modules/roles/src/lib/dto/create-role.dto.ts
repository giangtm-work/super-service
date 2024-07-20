import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RoleStatus } from '../models/role.model';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEnum([RoleStatus.Active, RoleStatus.Inactive])
  status = RoleStatus.Active;
}
