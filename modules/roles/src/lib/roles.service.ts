import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { dtoToEntity } from '@super-service/super-mapper';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

  create(createRoleDto: CreateRoleDto) {
    return this.roleRepository.save(dtoToEntity(new Role(), createRoleDto));
  }

  findAll() {
    return this.roleRepository.find();
  }

  findById(id: string) {
    return this.roleRepository.findOneBy({ id });
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = new Role();
    role.id = id;
    return this.roleRepository.update(id, dtoToEntity(role, updateRoleDto));
  }

  remove(id: string) {
    return this.roleRepository.delete(id);
  }
}
