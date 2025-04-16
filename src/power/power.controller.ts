import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PowerService } from './power.service';
import { CreatePowerDto } from './dto/create-power.dto';
import { UpdatePowerDto } from './dto/update-power.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('power')
export class PowerController {
  constructor(private readonly powerService: PowerService) {}

  @Post()
  create(@Body() createPowerDto: CreatePowerDto) {
    return this.powerService.create(createPowerDto);
  }

  @Get()
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
    findAll(
      @Query('page') page: number = 1, 
      @Query('pageSize') pageSize: number = 10, 
    ) {
      
    return this.powerService.findAll(+page, +pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.powerService.findOne(+id);
  }

  @Get('/name')
  search(@Param('name') name: string) {
    return this.powerService.findByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePowerDto: UpdatePowerDto) {
    return this.powerService.update(+id, updatePowerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.powerService.remove(+id);
  }
}
