import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MasterProfessionService } from './master-profession.service';
import { CreateMasterProfessionDto } from './dto/create-master-profession.dto';
import { UpdateMasterProfessionDto } from './dto/update-master-profession.dto';

@Controller('master-profession')
export class MasterProfessionController {
  constructor(private readonly masterProfessionService: MasterProfessionService) {}

  @Post()
  create(@Body() createMasterProfessionDto: CreateMasterProfessionDto) {
    return this.masterProfessionService.create(createMasterProfessionDto);
  }

  @Get()
  findAll() {
    return this.masterProfessionService.findAll();
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
