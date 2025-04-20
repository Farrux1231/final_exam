import { Injectable,
  NotFoundException,
  BadRequestException, } from '@nestjs/common';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ProfessionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProfessionDto: CreateProfessionDto) {
    try {
      const profession = await this.prisma.profession.create({
        data: { ...createProfessionDto },
      });
      return profession;
    } catch (error) {
      throw new BadRequestException(`Error creating profession: ${error.message}`);
    }
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    try {
      const professions = await this.prisma.profession.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          masterProfession: true,
          professionLevel: true,
          tools: true,
        },
      });

      const totalCount = await this.prisma.profession.count();

      return {
        data: professions,
        meta: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / pageSize),
          totalItems: totalCount,
          pageSize: pageSize,
        },
      };
    } catch (error) {
      throw new BadRequestException(`Error retrieving professions: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const profession = await this.prisma.profession.findUnique({
        where: { id },
        include: {
          masterProfession: true,
          professionLevel: true,
          tools: true,
        },
      });

      if (!profession) {
        throw new NotFoundException(`Profession with ID #${id} not found`);
      }

      return profession;
    } catch (error) {
      throw new NotFoundException(`Error retrieving profession: ${error.message}`);
    }
  }

  async update(id: number, updateProfessionDto: UpdateProfessionDto) {
    try {
      const updatedProfession = await this.prisma.profession.update({
        where: { id },
        data: { ...updateProfessionDto },
      });
      await this.prisma.basket.deleteMany()
      return updatedProfession;
    } catch (error) {
      throw new NotFoundException(`Error updating profession: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const deletedProfession = await this.prisma.profession.delete({
        where: { id },
      });

      return deletedProfession;
    } catch (error) {
      throw new NotFoundException(`Error deleting profession: ${error.message}`);
    }
  }
}
