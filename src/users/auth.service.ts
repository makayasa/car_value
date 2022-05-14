import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    @InjectRepository(User) private repo: Repository<User>,
  ) {}

  async signUp(email: string, password: string) {
    const users = await this.userService.findContains(email);
    console.log('isi users apa dah', users.length);

    if (users.length) {
      throw new BadRequestException('email is already used');
    }
    const salt = 'a6b6c9d9';
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    console.log('hasil hasl', result);

    const user = await this.userService.create(email, result);
    return user;
  }

  async signIn(email: string, password: string) {
    const user = await this.repo.findOne({ where: { email } });
    console.log('login user', user);
    console.log('login user', email);
    if (!user) {
      throw new BadRequestException('email not found');
    }
    // const salt = randomBytes(8).toString('hex');
    const salt = 'a6b6c9d9';
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const pass = salt + '.' + hash.toString('hex');
    console.log('password login', pass);
    if (user.password == pass) {
      console.log('login berhasil');
      return user;
    } else {
      throw new BadRequestException('wrong password');

    }
  }
}
