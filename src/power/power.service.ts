import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePowerDto } from './dto/create-power.dto';
import { UpdatePowerDto } from './dto/update-power.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class PowerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPowerDto: CreatePowerDto) {
    try {
      let oldpower = await this.prisma.power.findUnique({where:{name:createPowerDto.name}})
      if(oldpower){
        throw new BadRequestException("ALready created")
      }
      const power = await this.prisma.power.create({
        data: { ...createPowerDto },
      });
      return power;
    } catch (error) {
      throw new BadRequestException(`Error creating power: ${error.message}`);
    }
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    try {
      const powers = await this.prisma.power.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: { tools: true }, 
      });

      const totalCount = await this.prisma.power.count();

      return {
        data: powers,
        meta: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / pageSize),
          totalItems: totalCount,
          pageSize: pageSize,
        },
      };
    } catch (error) {
      throw new BadRequestException(`Error retrieving powers: ${error.message}`);
    }
  }

  async findOne(id: number) {
    const power = await this.prisma.power.findUnique({
      where: { id },
      include: { tools: true }, 
    });

    if (!power) {
      throw new NotFoundException(`Power with ID #${id} not found`);
    }

    return power;
  }

  async findByName(name:string){
    return await this.prisma.power.findUnique({where:{name:name}, include:{
      tools:true
    }})
  }

  async update(id: number, updatePowerDto: UpdatePowerDto) {
    try {
      const updatedPower = await this.prisma.power.update({
        where: { id },
        data: { ...updatePowerDto }
      });
      return updatedPower;
    } catch (error) {
      throw new NotFoundException(`Error updating power: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const deletedPower = await this.prisma.power.delete({
        where: { id }
      });
      return deletedPower;
    } catch (error) {
      throw new NotFoundException(`Error deleting power: ${error.message}`);
    }
  }
}

