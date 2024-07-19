import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@super-service/roles';
import { User } from '@super-service/users';
import { UserRole } from './entities/user-role.entity';
import { UsersRolesController } from './users-roles.controller';
import { UsersRolesService } from './users-roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserRole])],
  controllers: [UsersRolesController],
  providers: [UsersRolesService],
  exports: [UsersRolesService]
})
export class UsersRolesModule {}
