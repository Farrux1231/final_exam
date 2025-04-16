import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, MinLength, IsPhoneNumber, isString } from 'class-validator';
import { Role } from 'Role/user.role';

export class CreateUserDto {
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
    example: Role.USER_YUR,
  })
  @IsEnum(Role, { message: 'Noto‘g‘ri foydalanuvchi turi' })
  role: Role;

  @ApiProperty({
    description: 'Region ID',
    example: 1,
  })
  @IsInt({ message: 'Region ID butun son bo‘lishi kerak' })
  regionId: number;

  @ApiProperty({
    description: 'STIR (Soliq identifikatsiya raqami)',
    example: 123456789,
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'STIR butun son bo‘lishi kerak' })
  stir?: number;

  @ApiProperty({
    description: 'MFO (Bank kod)',
    example: 12345,
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'MFO butun son bo‘lishi kerak' })
  mfo?: number;

  @ApiProperty({
    description: 'HR',
    example: 5000,
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'HR butun son bo‘lishi kerak' })
  hr?: number;

  @ApiProperty({
    description: 'Bank nomi',
    example: 'Xalq Banki',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Bank nomi matn bo‘lishi kerak' })
  bank?: string;

  @ApiProperty({
    description: 'OKED (Faoliyat turi kodi)',
    example: 123456,
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'OKED butun son bo‘lishi kerak' })
  oked?: number;

  @ApiProperty({
    description: 'Manzil',
    example: 'Toshkent, Chilonzor tumani',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Manzil matn bo‘lishi kerak' })
  manzil?: string;
}
