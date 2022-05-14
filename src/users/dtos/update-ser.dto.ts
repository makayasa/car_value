import { IsEmail, IsOptional, IsString } from "class-validator";

export class updateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    password: string;
}