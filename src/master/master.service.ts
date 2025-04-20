import { Injectable } from '@nestjs/common';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class MasterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMasterDto: CreateMasterDto) {
    const { masterProfessions, ...masterData } = createMasterDto;

    const createdMaster = await this.prisma.master.create({
      data: {
        ...masterData,
      },
    });
  
    if (masterProfessions && masterProfessions.length > 0) {
      await Promise.all(
        masterProfessions.map((profession) =>
          this.prisma.masterProfessions.create({
            data: {
              ...profession,
              masterId: createdMaster.id, 
            },
          })
        )
      );
    }
  } 


  async findAll(page: number = 1, pageSize: number = 10, level?: string) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const filter = level
      ? {
          masterProfessions: {
            some: {
              level: {
                name: level,
              },
            },
          },
        }
      : {};

    const masters = await this.prisma.master.findMany({
      skip,
      take,
      where: filter,
      include: {
        masterProfessions: {
          include: {
            level: true, 
          },
        },
      },
    });

    const totalCount = await this.prisma.master.count({
      where: filter,
    });

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
    const { masterProfessions, ...masterData } = updateMasterDto;
  
    return await this.prisma.$transaction(async (prisma) => {
      const updatedMaster = await prisma.master.update({
        where: { id },
        data: masterData,
      });
  
      if (masterProfessions && masterProfessions.length > 0) {
        await prisma.masterProfessions.deleteMany({
          where: { masterId: id },
        });
  
        await Promise.all(
          masterProfessions.map((profession) =>
            prisma.masterProfessions.create({
              data: {
                ...profession,
                masterId: id,
              },
            })
          )
        );
      }
  
      return updatedMaster;
    });
  }
  

  async remove(id: number) {
    try {
      let master = await this.prisma.master.findUnique({where:{id}})
      if(!master){
        throw Error("Not found")
      }

      await this.prisma.masterProfessions.deleteMany({where:{masterId:id}})

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

