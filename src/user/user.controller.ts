import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
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
import { ApiQuery } from '@nestjs/swagger';

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
  login(@Body() LoginUserDto:LoginUserDto,
  @Req() request: Request) {
    return this.userService.login(LoginUserDto, request);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
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

  @Roles(Role.VIEWER_ADMIN)
  @Roles(Role.SUPER_ADMIN)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get("/users")
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
    @ApiQuery({ name: 'serachByPhone', required: false, type: String, example: "+998901234567" })
    @ApiQuery({ name: 'sortBy_asc_or_desc', required: false, type: String, example: "asc" })
    findAll(
      @Query('page') page: number = 1, 
      @Query('pageSize') pageSize: number = 10, 
      @Query('serachByPhone') phone: string, 
      @Query('sortBy_asc_or_desc') sort: string, 
    ) {
    this.userService.getUsers(+page, +pageSize, phone, sort)
  }
  
}
