import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { totp } from 'otplib';
import { VerifyUserDto } from './dto/verify-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Role } from 'Role/user.role';
import { CreateAdminDto } from './dto/create-admin.dto';



@Injectable()
export class UserService {
  private ADMIN: {
    name: string;
    phone: string;
    password: string;
    role: string;
    regionId: number;
  };

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
    this.ADMIN = {
      name: "2018200010",
      phone: "+998101001234",
      password: "+998101001234",
      role: "admin",
      regionId: 1,
    };
  }

  async findUser(phone:string){
    return await this.prisma.user.findFirst({
      where: {
        phone: phone,
      },
    });
  }

  async register(createUserDto: CreateUserDto) {

    let roles = [Role.ADMIN, Role.SUPER_ADMIN, Role.VIEWER_ADMIN];

    if (roles.includes(createUserDto.role)) {
      throw new BadRequestException("You cannot register as admin");
    }

    let user = await this.findUser(createUserDto.phone)
    // console.log(user);
    
    // if (user) {
    //   throw new BadRequestException("You are already registered.");
    // }

    await this.prisma.user.create({data:createUserDto})

    totp.options = {
      step: 120,
    };
    let otp = totp.generate(`secret${createUserDto.phone}`)

    // console.log(otp);
    return {otp,
      message:"You can verify your account now"
    }
    
  }

  async verify(VerifyUserDto:VerifyUserDto) {
    let otp = VerifyUserDto.otp
    let secret = `secret${VerifyUserDto.phone}`
    const isValid = totp.check(otp, secret);
    let user = await this.findUser(VerifyUserDto.phone)
    // console.log(isValid);
    
    if(!isValid){
      return "Wrong credentials"
    }

    await this.prisma.user.update({
      where: {
        id: user!.id, 
      },
      data: {
        status: 'active', 
      },
    });
    return {message:"Your account activated"};
  }

  async login(LoginUserDto:LoginUserDto, request:Request) {
    // const userId = request['user'];
    // const ip = request.ip

    // if (!userId) {
    //   throw new UnauthorizedException('User ID not found in request. Please register.');
    // }
    
    if (LoginUserDto.phone == this.ADMIN.phone && LoginUserDto.password == this.ADMIN.password) {
      let admin = await this.findUser(this.ADMIN.phone);
      if (admin) {
        // let session = await this.prisma.session.findMany({where:{userId:userId }})
        // if(!session){
        //   await this.prisma.session.create({data:{userId:userId, ip:ip!}})
        // }
        // let loggedIp = session.filter((s)=>s.ip == ip)

        // if(!loggedIp){
        //   await this.prisma.session.create({data:{userId:userId, ip:ip!}})
        // }

        // if(session.length > 3){
        //   return {message:"You logged in from 3 devices:LIMIT"}
        // }
        let token = this.jwtService.sign({ id: admin.id, role: admin.role });
        return { token };
      }
      let region = await this.prisma.region.findUnique({where:{id:1}})
      if(!region){
        await this.prisma.region.create({data:{name:"Toshkent", }})
      }
      let newAdmin = await this.prisma.user.create({ data: { ...this.ADMIN } }); 
      let token = this.jwtService.sign({ id: newAdmin.id, role: newAdmin.role });
        return { token };
    }
    
    let user = await this.findUser(LoginUserDto.phone)
    
    if(!user){
      return {message:"You must register first"}
    }
    
    // let session = await this.prisma.session.findMany({where:{userId:userId }})
    //   if(!session){
    //     await this.prisma.session.create({data:{userId:userId, ip:ip!}})
    //   }
    //   let loggedIp = session.filter((s)=>s.ip == ip)

    //   if(!loggedIp){
    //     await this.prisma.session.create({data:{userId:userId, ip:ip!}})
    //   }

    //   if(session.length > 3){
    //     return {message:"You logged in from 3 devices:LIMIT"}
    //   }

    let token = this.jwtService.sign({id:user!.id, role:user!.role})
    if(user.password == LoginUserDto.password && user.phone == LoginUserDto.phone){
      return {token}
    }
    return `Wrong credentials`;
  }


  async logout(request:Request){
    let userId = request["user"]
    if (!userId) {
      throw new UnauthorizedException('User ID not found in request. Please log in.');
    }

    let user = await this.prisma.user.findUnique({where:{id:userId}})
    if(user?.status == "pending"){
      return "ustoz login qilmasdan logout qilib bolmaydi"
    }
    await this.prisma.user.update({
      where: {
        id: user!.id, 
      },
      data: {
        status: 'pending', 
      },
    });
    return {message:"logged out"}

  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    let user = await this.prisma.user.findUnique({where:{id:id}})
    if(!user){
      throw new NotFoundException('User not found');
    }
    let updatedUser = await this.prisma.user.update({
      where: {
        id: user.id, 
      },
      data: {
        ...updateUserDto, 
      },
    });

    return {updatedUser};
   }


  async deleteUser(id:number){
  let user = await this.prisma.user.findUnique({where:{id:id}})
  if(user){
    throw new NotFoundException('User not found');
  }
  await this.prisma.session.deleteMany({where:{userId:user!.id}})

  const removedUser = await this.prisma.user.delete({
    where: { id:user!.id },
  });
  return {removedUser}
  }


  async deleteSession(id:number){
    try {
      let session = await this.prisma.session.findUnique({where:{id:id}})
      if(!session){
        throw new NotFoundException()
      }
      await this.prisma.session.delete({where:{id}})
    } catch (error) {
      throw  new Error(error.message)
    }
  }

  async getMe(request: Request) {
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

  // let {id, ...info} = user
  return {me:user};
  }

  async createAdmin(createAdminDto:CreateAdminDto){
    let admin = await this.findUser(createAdminDto.phone)
    if(admin){
      throw new BadRequestException("This account is already taken");
    }
    let newAdmin = await this.prisma.user.create({ data: createAdminDto });
    return newAdmin
  }

  async getUsers(
    page: number = 1,
    pageSize: number = 10,
    phone?: string,
    sort?: string
  ) {
    if (phone) {
      const user = await this.prisma.user.findFirst({
        where: { phone: phone },
        include: {
          region: true,
          sessions: true,
          orders: true,
        },
      });
  
      if (!user) {
        throw new NotFoundException(`User with phone ${phone} not found`);
      }
  
      return {
        data: [user], 
        meta: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 1,
          pageSize: 1,
        },
      };
    }
  
    let orderBy: { [key: string]: 'asc' | 'desc' } | undefined;

if (sort === 'asc') {
  orderBy = { id: 'asc' }; 
} else if (sort === 'desc') {
  orderBy = { id: 'desc' }; 
} else {
  throw new BadRequestException("Invalid sort parameter. Use 'asc' or 'desc'.");
}

  
    const users = await this.prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        region: true,
        sessions: true,
        orders: true,
      },
      orderBy: orderBy,
    });
  
    const totalCount = await this.prisma.user.count();
  
    return {
      data: users,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / pageSize),
        totalItems: totalCount,
        pageSize: pageSize,
      },
    };
  }
  
}
