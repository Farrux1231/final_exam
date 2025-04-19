import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProfessionLevelService } from './profession-level.service';
import { CreateProfessionLevelDto } from './dto/create-profession-level.dto';
import { UpdateProfessionLevelDto } from './dto/update-profession-level.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('profession-level')
export class ProfessionLevelController {
  constructor(private readonly professionLevelService: ProfessionLevelService) {}

  @Post()
  create(@Body() createProfessionLevelDto: CreateProfessionLevelDto) {
    return this.professionLevelService.create(createProfessionLevelDto);
  }

  @Get()
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
    findAll(
      @Query('page') page: number = 1, 
      @Query('pageSize') pageSize: number = 10, 
    )  {
    return this.professionLevelService.findAll(+page, +pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionLevelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfessionLevelDto: UpdateProfessionLevelDto) {
    return this.professionLevelService.update(+id, updateProfessionLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionLevelService.remove(+id);
  }
}
