import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MasterProfessionService } from './master-profession.service';
import { CreateMasterProfessionDto } from './dto/create-master-profession.dto';
import { UpdateMasterProfessionDto } from './dto/update-master-profession.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('master-profession')
export class MasterProfessionController {
  constructor(private readonly masterProfessionService: MasterProfessionService) {}

  @Post()
  create(@Body() createMasterProfessionDto: CreateMasterProfessionDto) {
    return this.masterProfessionService.create(createMasterProfessionDto);
  }

  @Get()
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
    findAll(
      @Query('page') page: number = 1, 
      @Query('pageSize') pageSize: number = 10, 
    )  {
    return this.masterProfessionService.findAll(+page, +pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterProfessionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMasterProfessionDto: UpdateMasterProfessionDto) {
    return this.masterProfessionService.update(+id, updateMasterProfessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterProfessionService.remove(+id);
  }
}
