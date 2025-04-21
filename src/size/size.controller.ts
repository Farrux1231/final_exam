import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/decoration/user.decoration';
import { Role } from 'Role/user.role';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizeService.create(createSizeDto);
  }


  @UseGuards(AuthGuard)
  @Get()
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
    findAll(
      @Query('page') page: number = 1, 
      @Query('pageSize') pageSize: number = 10, 
    ){
    return this.sizeService.findAll(+page, +pageSize);
  }


  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sizeService.findOne(+id);
  }


  @UseGuards(AuthGuard)
  @Get('/name')
  search(@Param('name') name: string) {
    return this.sizeService.findByName(name);
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSizeDto: UpdateSizeDto) {
    return this.sizeService.update(+id, updateSizeDto);
  }


  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sizeService.remove(+id);
  }
}
