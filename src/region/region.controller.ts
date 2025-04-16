import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }


  @UseGuards(AuthGuard)
  @Get()
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
    findAll(
      @Req() request: Request,
      @Query('page') page: number = 1, 
      @Query('pageSize') pageSize: number = 10, 
    ) 
  {
    return this.regionService.findAll(+page, +pageSize, request);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() request: Request,) {
    return this.regionService.findOne(+id, request);
  }

  @Get('/name')
  search(@Param('name') name: string,
  @Req() request: Request) {
    return this.regionService.findByName(name, request);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
