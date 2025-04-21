import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto) {
    try {
      let oldbrand = await this.prisma.brand.findUnique({where:{name:createBrandDto.name}})
      if(oldbrand){
        throw new BadRequestException("ALready created")
      }
      const brand = await this.prisma.brand.create({
        data: { ...createBrandDto },
      });
      return brand;
    } catch (error) {
      throw new BadRequestException(`Error creating brand: ${error.message}`);
    }
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    try {
      
      const brands = await this.prisma.brand.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        include:{
          tools:true
        }
      });

      const totalCount = await this.prisma.brand.count();

      return {
        data: brands,
        meta: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / pageSize),
          totalItems: totalCount,
          pageSize: pageSize,
        },
      };
    } catch (error) {
      throw new BadRequestException(`Error retrieving brands: ${error.message}`);
    }
  }

  async findOne(id: number) {
    const brand = await this.prisma.brand.findUnique({
      where: { id },
      include:{
        tools:true
      }
    });

    if (!brand) {
      throw new NotFoundException(`Brand with ID #${id} not found`);
    }

    return brand;
  }

  async findByName(name:string){
    return await this.prisma.brand.findUnique({
      where:{name:name}, 
      include:{
        tools:true
    }})
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    try {
      const updatedBrand = await this.prisma.brand.update({
        where: { id },
        data: { ...updateBrandDto },
      });
      return updatedBrand;
    } catch (error) {
      throw new NotFoundException(`Error updating brand: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const deletedBrand = await this.prisma.brand.delete({
        where: { id },
      });
      return deletedBrand;
    } catch (error) {
      throw new NotFoundException(`Error deleting brand: ${error.message}`);
    }
  }
}

