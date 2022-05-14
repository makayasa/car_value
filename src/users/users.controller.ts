import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  Serialize,
  SerializeInterceptor,
} from 'src/interceptors/serialize.interceptor';
import { uuid } from 'uuidv4';
import { AuthService } from './auth.service';
import { createUserDto } from './dtos/create-user.dto';
import { signInDto } from './dtos/signin.dto';
import { updateUserDto } from './dtos/update-ser.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signup')
  createUser(@Body() body: createUserDto) {
    // this.userService.create(body.email, body.password);
    return this.authService.signUp(body.email, body.password);
  }

  @Post('/signin')
  signIn(@Body() body: signInDto) {
    return this.authService.signIn(body.email, body.password);
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findUserContains(@Query('email') email: string) {
    console.log('emailnya', email);
    return this.userService.findContains(email);
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get('/findAll')
  findAll() {
    console.log('handler is running');

    return this.userService.findAll();
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:uuid')
  async findUser(@Param('uuid') uuid: string) {
    const user = await this.userService.findOne(uuid);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @Delete('/:uuid')
  removeUser(@Param('uuid') uuid: string) {
    return this.userService.remove(uuid);
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/:id')
  updateUser(@Param('uuid') uuid: string, @Body() body: updateUserDto) {
    return this.userService.update(uuid, body);
  }
}
