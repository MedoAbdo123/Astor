import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { RolesGuard } from 'src/products/guard/role.guard';
import { LoginUserDro } from './dto/loginUser.dto';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async RigsterUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.RigsterUser(createUserDto)
  }

  @Post('login')
  async LoginUser(@Body() loginUserDto: LoginUserDro){
    return this.authService.loginUser(loginUserDto)
  }

  @Patch('userUpgrade/:userId')
  @UseGuards(RolesGuard)
  async userUpgrade(@Param('userId') userId: string) {
    return this.authService.userUpgrade(userId)
  }

  @Get('getUsers')
  async getAllUsers() {
    return this.authService.getAllUsers()
  }
}