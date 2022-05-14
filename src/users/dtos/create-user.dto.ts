import { IsEmail, IsString, IsUUID } from 'class-validator';

export class createUserDto {
//   @IsUUID()
//   uuid!: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
