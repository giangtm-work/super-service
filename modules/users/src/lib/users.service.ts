import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { dtoToEntity } from '@super-service/super-mapper';
import * as bcrypt from 'bcrypt';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save(dtoToEntity(new User(), createUserDto));
  }

  findAll() {
    return this.userRepository.find();
  }

  findById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = new User();
    user.id = id;
    return this.userRepository.update(id, dtoToEntity(user, updateUserDto, ['username', 'password']));
  }

  remove(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  findByUsernameWithPassword(username: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username = :username', { username })
      .getOne();
  }

  async validateUser(username: string, password: string) {
    const user = await this.findByUsernameWithPassword(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
