import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    public userRepo: UserRepository
  ) { }
  async create(createUserDto: CreateUserDto) {
    return await this.userRepo.create(createUserDto);
  }

  async findAll() {
    return await this.userRepo.showAll();
  }

  async findOne(email: string) {
    return await this.userRepo.findOneByEmail(email);
  }

  async getCount() {
    return await this.userRepo.count();
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(email, updateUserDto);
  }

  async remove(email: string) {
    return await this.userRepo.remove(email);
  }
}
