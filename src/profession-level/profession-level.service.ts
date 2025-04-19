import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateProfessionLevelDto } from './dto/create-profession-level.dto';
import { UpdateProfessionLevelDto } from './dto/update-profession-level.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ProfessionLevelService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProfessionLevelDto: CreateProfessionLevelDto) {
    const { professionId, levelId } = createProfessionLevelDto;

    const profession = await this.prisma.profession.findUnique({ where: { id: professionId } });
    const level = await this.prisma.level.findUnique({ where: { id: levelId } });

    if (!profession) {
      throw new BadRequestException(`Profession with ID ${professionId} does not exist`);
    }
    if (!level) {
      throw new BadRequestException(`Level with ID ${levelId} does not exist`);
    }

    try {
      const professionLevel = await this.prisma.professionLevel.create({
        data: { ...createProfessionLevelDto },
      });
      return professionLevel;
    } catch (error) {
      throw new BadRequestException(`Error creating profession level: ${error.message}`);
    }
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    try {
      const professionLevels = await this.prisma.professionLevel.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        select:{
          id:true,
          minWorking_h:true,
          price_d:true,
          price_h:true,
          profession: {
            include: {
              tools: {
                where: {
                  isActive: true,
                },
              },
            },
          },
          level: true,
      }
      });

      const totalCount = await this.prisma.professionLevel.count();

      return {
        data: professionLevels,
        meta: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / pageSize),
          totalItems: totalCount,
          pageSize: pageSize,
        },
      };
    } catch (error) {
      throw new BadRequestException(`Error retrieving profession levels: ${error.message}`);
    }
  }

  async findOne(id: number) {
    const professionLevel = await this.prisma.professionLevel.findUnique({
      where: { id },
      select:{
        id:true,
        minWorking_h:true,
        price_d:true,
        price_h:true,
        profession: {
          include: {
            tools: {
              where: {
                isActive: true,
              },
            },
          },
        },
        level: true,
    }
    });

    if (!professionLevel) {
      throw new NotFoundException(`Profession Level with ID #${id} not found`);
    }

    return professionLevel;
  }

  async update(id: number, updateProfessionLevelDto: UpdateProfessionLevelDto) {
    const { professionId, levelId } = updateProfessionLevelDto;

    if (professionId) {
      const profession = await this.prisma.profession.findUnique({ where: { id: professionId } });
      if (!profession) {
        throw new BadRequestException(`Profession with ID ${professionId} does not exist`);
      }
    }

    if (levelId) {
      const level = await this.prisma.level.findUnique({ where: { id: levelId } });
      if (!level) {
        throw new BadRequestException(`Level with ID ${levelId} does not exist`);
      }
    }

    try {
      const updatedProfessionLevel = await this.prisma.professionLevel.update({
        where: { id },
        data: { ...updateProfessionLevelDto },
      });
      return updatedProfessionLevel;
    } catch (error) {
      throw new NotFoundException(`Error updating profession level: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const deletedProfessionLevel = await this.prisma.professionLevel.delete({
        where: { id },
      });
      return deletedProfessionLevel;
    } catch (error) {
      throw new NotFoundException(`Error deleting profession level: ${error.message}`);
    }
  }
}


