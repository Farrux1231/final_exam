import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decoration/user.decoration';
import { Role } from 'Role/user.role';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}


  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createBasketDto: CreateBasketDto, 
        @Req() request: Request) {
    return this.basketService.create(createBasketDto, request);
  }

  @Roles(Role.USER_YUR)
  @Roles(Role.USER_FIZ)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Req() request: Request) {
    return this.basketService.findOne(request);
  }

  @Roles(Role.USER_YUR)
  @Roles(Role.USER_FIZ)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBasketDto: UpdateBasketDto) {
    return this.basketService.update(+id, updateBasketDto);
  }

  @Roles(Role.USER_YUR)
  @Roles(Role.USER_FIZ)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basketService.remove(+id);
  }
}
