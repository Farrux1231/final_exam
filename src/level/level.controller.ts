import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { LevelService } from './level.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/decoration/user.decoration';
import { Role } from 'Role/user.role';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelService.create(createLevelDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
  findAll(
    @Query('page') page: number = 1, 
    @Query('pageSize') pageSize: number = 10, 
    ){
    return this.levelService.findAll(+page, +pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.levelService.findOne(+id);
  }

  @Get('/name')
  search(@Param('name') name: string) {
    return this.levelService.findByName(name);
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLevelDto: UpdateLevelDto) {
    return this.levelService.update(+id, updateLevelDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.levelService.remove(+id);
  }
}
