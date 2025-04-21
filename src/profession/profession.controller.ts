import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/decoration/user.decoration';
import { Role } from 'Role/user.role';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('profession')
export class ProfessionController {
  constructor(private readonly professionService: ProfessionService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createProfessionDto: CreateProfessionDto) {
    return this.professionService.create(createProfessionDto);
  }


  @UseGuards(AuthGuard)
  @Get()
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
    findAll(
      @Query('page') page: number = 1, 
      @Query('pageSize') pageSize: number = 10, 
    ) {
    return this.professionService.findAll(+page, +pageSize);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionService.findOne(+id);
  }

  @Roles(Role.ADMIN,Role.SUPER_ADMIN)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfessionDto: UpdateProfessionDto) {
    return this.professionService.update(+id, updateProfessionDto);
  }


  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionService.remove(+id);
  }
}
