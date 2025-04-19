import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateMasterProfessionDto } from './dto/create-master-profession.dto';
import { UpdateMasterProfessionDto } from './dto/update-master-profession.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class MasterProfessionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMasterProfessionDto: CreateMasterProfessionDto) {
    try {
      const masterProfessions = await this.prisma.masterProfessions.create({
        data: createMasterProfessionDto,
      });
      return masterProfessions;
    } catch (error) {
      throw new BadRequestException(`Error creating masterProfessions: ${error.message}`);
    }
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    try {
      const masterProfessions = await this.prisma.masterProfessions.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          profession: true, 
          level: true,      
          master: true,     
        },
      });

      const totalCount = await this.prisma.masterProfessions.count();

      return {
        data: masterProfessions,
        meta: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / pageSize),
          totalItems: totalCount,
          pageSize: pageSize,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error retrieving masterProfessions: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const masterProfessions = await this.prisma.masterProfessions.findUnique({
        where: { id },
        include: {
          profession: true, 
          level: true,      
          master: true,     
        },
      });

      if (!masterProfessions) {
        throw new NotFoundException(`MasterProfession with ID #${id} not found`);
      }

      return masterProfessions;
    } catch (error) {
      throw new InternalServerErrorException(`Error retrieving masterProfessions: ${error.message}`);
    }
  }

  async update(id: number, updateMasterProfessionDto: UpdateMasterProfessionDto) {
    try {
      const updatedMasterProfession = await this.prisma.masterProfessions.update({
        where: { id },
        data: updateMasterProfessionDto,
      });

      return updatedMasterProfession;
    } catch (error) {
      throw new InternalServerErrorException(`Error updating masterProfessions: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const deletedMasterProfession = await this.prisma.masterProfessions.delete({
        where: { id },
      });

      return deletedMasterProfession;
    } catch (error) {
      throw new InternalServerErrorException(`Error deleting masterProfessions: ${error.message}`);
    }
  }
}

