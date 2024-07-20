import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles, Role } from '@super-service/super-decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.SuperAdmin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.SuperAdmin)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.SuperAdmin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
