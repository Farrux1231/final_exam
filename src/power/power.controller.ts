import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PowerService } from './power.service';
import { CreatePowerDto } from './dto/create-power.dto';
import { UpdatePowerDto } from './dto/update-power.dto';
import { ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/decoration/user.decoration';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role } from 'Role/user.role';

@Controller('power')
export class PowerController {
  constructor(private readonly powerService: PowerService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPowerDto: CreatePowerDto) {
    return this.powerService.create(createPowerDto);
  }

  @UseGuards(AuthGuard)
  @Get()
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
    findAll(
      @Query('page') page: number = 1, 
      @Query('pageSize') pageSize: number = 10, 
    ) {
      
    return this.powerService.findAll(+page, +pageSize);
  }


  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.powerService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Get('/name')
  search(@Param('name') name: string) {
    return this.powerService.findByName(name);
  }

  @Roles(Role.SUPER_ADMIN)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePowerDto: UpdatePowerDto) {
    return this.powerService.update(+id, updatePowerDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.powerService.remove(+id);
  }
}
