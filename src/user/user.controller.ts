import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';
import { CreateAdminDto } from './dto/create-admin.dto';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decoration/user.decoration';
import { Role } from 'Role/user.role';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post("verify/account")
  verify(@Body() VerifyUserDto:VerifyUserDto) {
    return this.userService.verify(VerifyUserDto);
  }

  @Post("login")
  login(@Body() LoginUserDto:LoginUserDto) {
    return this.userService.login(LoginUserDto);
  }

  @Patch(':phone')
  update(@Param('phone') phone: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(phone, updateUserDto);
  }

  @Delete(':phone')
  remove(@Param('phone') phone: string) {
    return this.userService.deleteUser(phone);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@Req() request: Request) {
    return this.userService.getMe(request);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post("create/admin")
  async createAdmin(createAdminDto:CreateAdminDto){
    return this.userService.createAdmin(createAdminDto)
  }
  
}
