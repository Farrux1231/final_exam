import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BasketService {
  constructor(private readonly prisma:PrismaService){}

  async create(createBasketDto: CreateBasketDto, request: Request) {
    
      let user = request['user']      

      let profession = await this.prisma.profession.findUnique({where:{id:createBasketDto.professionId}})
      if(!profession){
        throw new NotFoundException("Not fount Profession")
      }
      let tool = await this.prisma.tools.findUnique({where:{id:createBasketDto.toolsId}})
      if(!tool){
        throw new NotFoundException("Not fount tool")
      }
      let level = await this.prisma.level.findUnique({where:{id:createBasketDto.levelId}})
      if(!level){
        throw new NotFoundException("Not fount level")
      }
      
      let basket = await this.prisma.basket.create({data:{userId:user, ...createBasketDto}})
      return basket
    
  }


  async findOne(request: Request) {
    let userId = request["user"]
    let basket  = await this.prisma.basket.findFirst({where:{userId:userId}})
    console.log(basket);
    
    return {basket}
  }

 async update(id: number, updateBasketDto: UpdateBasketDto) {
    try {
      let updatedBasket = await this.prisma.basket.update({where:{id}, data:{...updateBasketDto}})
      return {updatedBasket}
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async remove(id: number) {
    await this.prisma.basket.delete({where:{id}})

    return {message:"Usish bormi"};
  }
}
