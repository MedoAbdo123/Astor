import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string

    @IsUrl()
    @IsString()
    @IsOptional()
    profile: string

    @IsString()
    role: string
}