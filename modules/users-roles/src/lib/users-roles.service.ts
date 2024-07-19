import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@super-service/roles';
import { User } from '@super-service/users';
import { In, Repository } from 'typeorm';
import { UserRolesDto } from './dto/user-roles.dto';
import { UserRole } from './entities/user-role.entity';

@Injectable()
export class UsersRolesService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  async assignRolesToUser(userRolesDto: UserRolesDto) {
    const { userId, roleIds } = userRolesDto;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const roles = await this.roleRepository.findBy({ id: In(roleIds) });
    if (roles.length !== roleIds.length) {
      throw new Error('One or more roles not found');
    }

    const userRoles = [];
    for (const role of roles) {
      const existingUserRole = await this.userRoleRepository.findOne({
        where: { user: { id: userId }, role: { id: role.id } }
      });

      if (!existingUserRole) {
        userRoles.push(this.userRoleRepository.create({ user, role }));
      }
    }

    return this.userRoleRepository.save(userRoles);
  }

  async removeRolesFromUser(userRolesDto: UserRolesDto) {
    const { userId, roleIds } = userRolesDto;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const roles = await this.roleRepository.findByIds(roleIds);
    if (roles.length !== roleIds.length) {
      throw new Error('One or more roles not found');
    }

    for (const role of roles) {
      const userRole = await this.userRoleRepository.findOne({
        where: { user: { id: userId }, role: { id: role.id } }
      });

      if (userRole) {
        await this.userRoleRepository.remove(userRole);
      }
    }
  }

  async getRolesForUser(userId: string) {
    const userRoles = await this.userRoleRepository.find({
      where: { user: { id: userId } },
      relations: ['role']
    });

    return userRoles.map((userRole) => userRole.role);
  }
}
