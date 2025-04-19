import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { Role } from 'Role/user.role';


@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRegionDto: CreateRegionDto) {
    const existingRegion = await this.prisma.region.findFirst({
      where: { name: createRegionDto.name },
    });

    if (existingRegion) {
      throw new BadRequestException('This region already exists');
    }

    const newRegion = await this.prisma.region.create({
      data: createRegionDto,
    });

    return {
      message: 'Region created successfully',
      region: newRegion,
    };
  }

  async findAll(page: number = 1, pageSize: number = 10, request:Request) {
    const userId = request['user'];
    
      if (!userId) {
        throw new UnauthorizedException('User ID not found in request. Please log in.');
      }

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new UnauthorizedException('User not found.');
      }

      let admins:Role[] = [Role.ADMIN, Role.SUPER_ADMIN, Role.VIEWER_ADMIN]
      // admin uchun
      if(admins.includes(user.role as Role)){

          const regions = await this.prisma.region.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: {
              user: true, 
            },
          });
          
          const totalItems = await this.prisma.region.count(); 
        return {
          data: regions,
          meta: {
            currentPage: page,
            totalPages: Math.ceil(totalItems / pageSize),
            totalItems,
            pageSize,
          },
        };

      }
      // user uchun
      const regions = await this.prisma.region.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize
      });
      
      const totalItems = await this.prisma.region.count(); 
    return {
      data: regions,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(totalItems / pageSize),
        totalItems,
        pageSize,
      },
    };

  }

  async findOne(id: number, request:Request) {
    const userId = request['user'];
      if (!userId) {
        throw new UnauthorizedException('User ID not found in request. Please log in.');
      }

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new UnauthorizedException('User not found.');
      }

      let admins:Role[] = [Role.ADMIN, Role.SUPER_ADMIN, Role.VIEWER_ADMIN]
      // admin uchun 
      if(admins.includes(user.role as Role)){
        const region = await this.prisma.region.findUnique({
          where: { id },
          include: {
            user: true, 
          },
        });
    
        if (!region) {
          throw new NotFoundException(`Region with ID #${id} not found`);
        }
    
        return region;
      }

      // user uchun 
      const region = await this.prisma.region.findUnique({
        where: { id }
      });
  
      if (!region) {
        throw new NotFoundException(`Region with ID #${id} not found`);
      }
  
      return region;

  }

  async findByName(name:string, request:Request){
    const userId = request['user'];
    
      if (!userId) {
        throw new UnauthorizedException('User ID not found in request. Please log in.');
      }

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new UnauthorizedException('User not found.');
      }

      let admins:Role[] = [Role.ADMIN, Role.SUPER_ADMIN, Role.VIEWER_ADMIN]
      if(admins.includes(user.role as Role)){

        return await this.prisma.region.findUnique({where:{name:name}, include:{
          user:true
        }})
      }
      
      // user uchun
      return await this.prisma.region.findUnique({where:{name:name}
      })
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    try {
      const updatedRegion = await this.prisma.region.update({
        where: { id },
        data: updateRegionDto,
      });

      return {
        message: 'Region updated successfully',
        region: updatedRegion,
      };
    } catch (error) {
      throw new NotFoundException(`Error updating region: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const deletedRegion = await this.prisma.region.delete({
        where: { id },
      });

      return {
        message: 'Region deleted successfully',
        region: deletedRegion,
      };
    } catch (error) {
      throw new NotFoundException(`Error deleting region: ${error.message}`);
    }
  }
}
