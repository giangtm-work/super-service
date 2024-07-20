import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from '@super-service/roles';
import { UsersModule } from '@super-service/users';
import { UserRole } from './entities/user-role.entity';
import { UsersRolesController } from './users-roles.controller';
import { UsersRolesService } from './users-roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole]), UsersModule, RolesModule],
  controllers: [UsersRolesController],
  providers: [UsersRolesService],
  exports: [UsersRolesService]
})
export class UsersRolesModule {}
