import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma:PrismaService){}

  async create(createOrderDto: CreateOrderDto) {
    try {
      if(createOrderDto.orderProducts.length == 0){
        throw new BadRequestException("Maxsulotlarni tanlang")
      }

      let masters:Array<object> = [];
      let preofId = createOrderDto.orderProducts.filter((r_p) => r_p.professionId != 0);
      console.log(preofId);

      for (let i = 0; i < preofId.length; i++) {
        let profession = await this.prisma.profession.findUnique({
          where: { id: preofId[i].professionId },
        });
        masters.push(profession as object);
}

console.log(masters); // To'g'ri massivni chiqarish

      
      return "asdfv"
    } catch (error) {
      throw new Error(error.message)
    }
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
