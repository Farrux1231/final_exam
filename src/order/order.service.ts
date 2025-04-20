import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto, request: Request) {
    let userId = request['user'];
    if (!userId) {
      throw new UnauthorizedException();
    }
    if (createOrderDto.orderProducts.length == 0) {
      throw new BadRequestException('Maxsulotlarni tanlang');
    }
    const { orderProducts, ...order } = createOrderDto;
    console.log(orderProducts);

    let tool = await this.prisma.tools.findUnique({where:{id:orderProducts[0].toolId}})
    if(!tool){
      throw new NotFoundException("Not fount Tool")
    }
    let Level = await this.prisma.level.findUnique({where:{id:orderProducts[0].levelId}})
    if(!Level){
      throw new NotFoundException("Not fount level")
    }
    let profession = await this.prisma.profession.findUnique({where:{id:orderProducts[0].professionId}})
    if(!profession){
      throw new NotFoundException("Not fount profession")
    }
    
    let newOrder = await this.prisma.order.create({
      data: { ...order, userId: userId, status: 'pending' },
    });
    for (let i = 0; i < orderProducts.length; i++) {
      await this.prisma.orderProduct.create({
        data: { orderId: newOrder.id, ...orderProducts[i], isActive: 'pending' },
      });
    }

    return { message: 'created order' };
  }

  async findAll() {
    let orders = await this.prisma.order.findMany({include:{
      orderProduct:true
    }})
    return {orders};
  }

  async findOne(id: number) {
    let order = await this.prisma.order.findUnique({where:{id}})
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const existingOrder = await this.prisma.order.findUnique({ where: { id } });
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        ...updateOrderDto,
        status: 'active', 
      },
    });

    return { message: 'Order updated successfully', updatedOrder };
  }

  async remove(id: number) {
    const existingOrder = await this.prisma.order.findUnique({ where: { id } });
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    await this.prisma.order.delete({ where: { id } });
    return { message: 'Order removed successfully' };
  }
}

