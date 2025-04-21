import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MasterService } from './master.service';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/decoration/user.decoration';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role } from 'Role/user.role';

@Controller('master')
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createMasterDto: CreateMasterDto) {
    return this.masterService.create(createMasterDto);
  }

  @Roles(Role.VIEWER_ADMIN)
  @Roles(Role.SUPER_ADMIN)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Get('getAllmaster')
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
    @ApiQuery({ name: 'filter By Level', required: false, type: String, example: "pro" })
    findAll(
      @Query('page') page: number = 1, 
      @Query('pageSize') pageSize: number = 10, 
      @Query('filter By Level') level: string, 
    ) {
    return this.masterService.findAll(page, pageSize, level);
  }

  @Roles(Role.VIEWER_ADMIN)
  @Roles(Role.SUPER_ADMIN)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Get('findByphone')
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
    findByPhone(
      @Query('page') page: number = 1, 
      @Query('pageSize') pageSize: number = 10,
      @Body('phone') phone:string 
    ) {
    return this.masterService.findByPhone(phone, +page, +pageSize);
  }

  @Roles(Role.VIEWER_ADMIN)
  @Roles(Role.SUPER_ADMIN)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterService.findOne(+id);
  }

  @Roles(Role.SUPER_ADMIN)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMasterDto: UpdateMasterDto) {
    return this.masterService.update(+id, updateMasterDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterService.remove(+id);
  }
}
