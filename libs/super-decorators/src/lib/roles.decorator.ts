import { SetMetadata } from '@nestjs/common';

export enum Role {
  SuperAdmin = 'superadmin',
  Admin = 'admin',
  User = 'user'
}

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
