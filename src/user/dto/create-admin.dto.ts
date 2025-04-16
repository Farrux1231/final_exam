import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString, MinLength, IsPhoneNumber } from 'class-validator';
import { Role } from 'Role/user.role';

export class CreateAdminDto {
  @ApiProperty({
    description: 'Foydalanuvchi ismi',
    example: 'John Doe',
  })
  @IsString()
  @MinLength(2, { message: 'Ism kamida 2 ta belgidan iborat bo‘lishi kerak' })
  name: string;

  @IsString()
  status: string = 'pending';

  @ApiProperty({
    description: 'Telefon raqami',
    example: '+998901234567',
  })
  @IsPhoneNumber(null!, { message: 'Telefon raqam to‘g‘ri formatda bo‘lishi kerak' })
  phone: string;

  @ApiProperty({
    description: 'Parol',
    example: 'strongPassword123',
  })
  @IsString()
  @MinLength(6, { message: 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak' })
  password: string;

  @ApiProperty({
    description: 'Foydalanuvchi roli',
    enum: Role,
    example: Role.SUPER_ADMIN,
  })
  @IsEnum(Role, { message: 'Noto‘g‘ri foydalanuvchi turi' })
  role: Role;

  @ApiProperty({
    description: 'Region ID',
    example: 1,
  })
  @IsInt({ message: 'Region ID butun son bo‘lishi kerak' })
  regionId: number;

}
