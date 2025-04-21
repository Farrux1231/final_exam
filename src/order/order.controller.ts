import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decoration/user.decoration';
import { Role } from 'Role/user.role';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, 
        @Req() request: Request) {
    return this.orderService.create(createOrderDto, request);
  }

  @Roles(Role.VIEWER_ADMIN)
  @Roles(Role.SUPER_ADMIN)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Roles(Role.SUPER_ADMIN)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
