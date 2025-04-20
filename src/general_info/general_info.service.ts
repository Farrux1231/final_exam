import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGeneralInfoDto } from './dto/create-general_info.dto';
import { UpdateGeneralInfoDto } from './dto/update-general_info.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class GeneralInfoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGeneralInfoDto: CreateGeneralInfoDto) {
    const { link, email, phone } = createGeneralInfoDto;
    return this.prisma.generalInfo.create({
      data: {
        link,
        email,
        phone,
      },
    });
  }

  async findAll() {
    return this.prisma.generalInfo.findMany();
  }

  async findOne(id: number) {
    const generalInfo = await this.prisma.generalInfo.findUnique({
      where: { id },
    });
    if (!generalInfo) {
      throw new NotFoundException(`General info with ID ${id} not found`);
    }
    return generalInfo;
  }

  async update(id: number, updateGeneralInfoDto: UpdateGeneralInfoDto) {
    const { link, email, phone } = updateGeneralInfoDto;
    const existingGeneralInfo = await this.prisma.generalInfo.findUnique({
      where: { id },
    });

    if (!existingGeneralInfo) {
      throw new NotFoundException(`General info with ID ${id} not found`);
    }

    return this.prisma.generalInfo.update({
      where: { id },
      data: {
        link,
        email,
        phone,
      },
    });
  }

  async remove(id: number) {
    const generalInfo = await this.prisma.generalInfo.findUnique({
      where: { id },
    });

    if (!generalInfo) {
      throw new NotFoundException(`General info with ID ${id} not found`);
    }

    return this.prisma.generalInfo.delete({
      where: { id },
    });
  }
}

