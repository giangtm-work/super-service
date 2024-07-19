import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserRolesDto } from './dto/user-roles.dto';
import { UsersRolesService } from './users-roles.service';

@Controller('users-roles')
export class UsersRolesController {
  constructor(private readonly usersRolesService: UsersRolesService) {}

  @Post('assign')
  assignRoles(@Body() userRolesDto: UserRolesDto) {
    return this.usersRolesService.assignRolesToUser(userRolesDto);
  }

  @Delete('remove')
  removeRoles(@Body() userRolesDto: UserRolesDto) {
    return this.usersRolesService.removeRolesFromUser(userRolesDto);
  }

  @Get(':userId/roles')
  getRoles(@Param('userId') userId: string) {
    return this.usersRolesService.getRolesForUser(userId);
  }
}
