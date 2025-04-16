import { Injectable } from '@nestjs/common';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class MasterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMasterDto: CreateMasterDto) {
    return await this.prisma.master.create({
      data: {
        ...createMasterDto,
      },
    });
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const masters = await this.prisma.master.findMany({
      skip,
      take,
      include: {
        masterProfessions: true, 
      },
    });

    const totalCount = await this.prisma.master.count();

    return {
      data: masters,
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  }

  async findOne(id: number) {
    return await this.prisma.master.findUnique({
      where: { id },
      include: {
        masterProfessions: true, 
      },
    });
  }

  async update(id: number, updateMasterDto: UpdateMasterDto) {
    return await this.prisma.master.update({
      where: { id },
      data: {
        ...updateMasterDto,
      },
    });
  }

  async remove(id: number) {
    try {
      let master = await this.prisma.master.findUnique({where:{id}})
      if(!master){
        throw Error("Not found")
      }

      await this.prisma.master.delete({
        where: { id },
      });
      return {message:"Deleted"}
      
    } catch (error) {
      return {Error:error.message}
    }
  }

  async findByPhone(phone: string, page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const masters = await this.prisma.master.findMany({
      where: {
        phone:phone,
      },
      skip,
      take,
      include: {
        masterProfessions: true, 
      },
    });

    const totalCount = await this.prisma.master.count({
      where: {
        phone:phone
        },
    
    });

    return {
      data: masters,
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  }
}

