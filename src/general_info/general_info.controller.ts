import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GeneralInfoService } from './general_info.service';
import { CreateGeneralInfoDto } from './dto/create-general_info.dto';
import { UpdateGeneralInfoDto } from './dto/update-general_info.dto';
import { Roles } from 'src/decoration/user.decoration';
import { Role } from 'Role/user.role';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('general-info')
export class GeneralInfoController {
  constructor(private readonly generalInfoService: GeneralInfoService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createGeneralInfoDto: CreateGeneralInfoDto) {
    return this.generalInfoService.create(createGeneralInfoDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.generalInfoService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generalInfoService.findOne(+id);
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeneralInfoDto: UpdateGeneralInfoDto) {
    return this.generalInfoService.update(+id, updateGeneralInfoDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generalInfoService.remove(+id);
  }
}
