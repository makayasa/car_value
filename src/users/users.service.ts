import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  login(email: string, password: string) {}

  findOne(uuid: string) {
    const user = this.repo.findOne(uuid);
    if (!user) {
      console.error('user not found');
    }
    return user;
  }

  findContains(email: string) {
    return this.repo.find({ email });
  }

  findAll() {
    return this.repo.find({});
  }

  async update(uuid: string, attributes: Partial<User>) {
    const user = await this.repo.findOne(uuid);
    if (!user) {
      //   throw new Error('User not found');
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attributes);
    return this.repo.save(user);
  }

  async remove(uuid: string) {
    const user = await this.repo.findOne(uuid);
    if (!user) {
      console.error('User not found');
    }
    return this.repo.remove(user);
  }
}
