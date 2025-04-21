import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class LevelService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLevelDto: CreateLevelDto) {
    try {
      let oldLevel = await this.prisma.level.findUnique({where:{name:createLevelDto.name}})
      if(oldLevel){
        throw new BadRequestException("ALready created")
      }
      const level = await this.prisma.level.create({
        data: {
          name: createLevelDto.name,
        },
      });
      return {level };
    } catch (error) {
      throw new Error(`Failed to create level: ${error.message}`);
    }
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    try {
      const skip = (page - 1) * pageSize;

      const levels = await this.prisma.level.findMany({
        skip,
        take: pageSize,
        include: {
          masterProfession: {
            include: {
              master: true, 
            },
          },
        },
      });

      const totalCount = await this.prisma.level.count();

      return {
        data: levels,
        meta: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / pageSize),
          totalItems: totalCount,
          pageSize,
        },
      };
    } catch (error) {
      throw new Error(`Failed to fetch levels: ${error.message}`);
    }
  }

  async findOne(id: number) {
      const level = await this.prisma.level.findUnique({
        where: { id },
        include: {
          masterProfession: {
            include: {
              master: true, 
            },
          },
        },
      });

      if (!level) {
        throw new Error(`Level with ID ${id} not found`);
      }

      return level;

  }

  async findByName(name:string){
    return await this.prisma.level.findUnique({
      where:{name:name},
      include: {
        masterProfession: {
          include: {
            master: true, 
          },
        },
      },
    })
  }

  async update(id: number, updateLevelDto: UpdateLevelDto) {
    try {
      const level = await this.prisma.level.update({
        where: { id },
        data: {
          name: updateLevelDto.name,
        },
      });
      return { level };
    } catch (error) {
      throw new Error(`Failed to update level: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.level.delete({
        where: { id },
      });
      return { message: `Level with ID ${id} deleted successfully` };
    } catch (error) {
      throw new Error(`Failed to delete level: ${error.message}`);
    }
  }
}

