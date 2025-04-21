import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProfessionLevelService } from './profession-level.service';
import { CreateProfessionLevelDto } from './dto/create-profession-level.dto';
import { UpdateProfessionLevelDto } from './dto/update-profession-level.dto';
import { ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/decoration/user.decoration';
import { Role } from 'Role/user.role';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('profession-level')
export class ProfessionLevelController {
  constructor(private readonly professionLevelService: ProfessionLevelService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createProfessionLevelDto: CreateProfessionLevelDto) {
    return this.professionLevelService.create(createProfessionLevelDto);
  }


  @UseGuards(AuthGuard)
  @Get()
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
    findAll(
      @Query('page') page: number = 1, 
      @Query('pageSize') pageSize: number = 10, 
    )  {
    return this.professionLevelService.findAll(+page, +pageSize);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionLevelService.findOne(+id);
  }

  @Roles(Role.SUPER_ADMIN)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfessionLevelDto: UpdateProfessionLevelDto) {
    return this.professionLevelService.update(+id, updateProfessionLevelDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionLevelService.remove(+id);
  }
}
