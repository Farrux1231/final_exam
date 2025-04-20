import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ToolsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createToolDto: CreateToolDto) {
    try {      
      const tool = await this.prisma.tools.create({
        data: createToolDto 
      });
      return {tool};
    } catch (error) {
      throw new BadRequestException(`Error creating tool: ${error.message}`);
    }
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    try {
      const tools = await this.prisma.tools.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          brand: true,
          power: true,
          size: true
        },
      });

      const totalCount = await this.prisma.tools.count();

      return {
        data: tools,
        meta: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / pageSize),
          totalItems: totalCount,
          pageSize: pageSize,
        },
      };
    } catch (error) {
      throw new BadRequestException(`Error retrieving tools: ${error.message}`);
    }
  }

  async findOne(id: number) {
    const tool = await this.prisma.tools.findUnique({
      where: { id },
      include: {
        brand: true,
        power: true,
        size: true
      },
    });

    if (!tool) {
      throw new NotFoundException(`Tool with ID #${id} not found`);
    }

    return {tool};
  }

  async update(id: number, updateToolDto: UpdateToolDto) {
    try {
      const updatedTool = await this.prisma.tools.update({
        where: { id },
        data: { ...updateToolDto }
      });
      await this.prisma.basket.deleteMany()
      return {updatedTool};
    } catch (error) {
      throw new NotFoundException(`Error updating tool: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const deletedTool = await this.prisma.tools.delete({
        where: { id },
      });
      await this.prisma.basket.deleteMany()
      return {deletedTool, message:"Deleted"};
    } catch (error) {
      throw new NotFoundException(`Error deleting tool: ${error.message}`);
    }
  }
}

