import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SizeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSizeDto: CreateSizeDto) {
    try {
      let oldsize = await this.prisma.size.findUnique({where:{name:createSizeDto.name}})
      if(oldsize){
        throw new BadRequestException("ALready created")
      }
      const size = await this.prisma.size.create({
        data: {
          ...createSizeDto,
        },
      });
      return size;
    } catch (error) {
      throw new Error(`Error creating size: ${error.message}`);
    }
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    try {
      const sizes = await this.prisma.size.findMany({
        skip: (page - 1) * pageSize, 
        take: pageSize, 
        include: {
          tools: true,
        },
      });
  
      const totalCount = await this.prisma.size.count();
  
      return {
        data: sizes,
        meta: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / pageSize),
          totalItems: totalCount,
          pageSize: pageSize,
        },
      };
    } catch (error) {
      throw new Error(`Error retrieving sizes: ${error.message}`);
    }
  }
  
  
  async findOne(id: number) {
    const size = await this.prisma.size.findUnique({
      where: { id },
      include: {
        tools: true,
      },
    });
    if (!size) {
      throw new NotFoundException(`Size with ID #${id} not found`);
    }
    return size;
  }
  
  async findByName(name:string){
    return await this.prisma.size.findUnique({where:{name:name}, include:{
      tools:true
    }})
  }

  async update(id: number, updateSizeDto: UpdateSizeDto) {
    try {
      const updatedSize = await this.prisma.size.update({
        where: { id },
        data: {
          ...updateSizeDto,
        },
      });
      return updatedSize;
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const deletedSize = await this.prisma.size.delete({
        where: { id },
      });
      return deletedSize;
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }
}
