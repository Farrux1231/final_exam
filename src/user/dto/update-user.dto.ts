import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Role } from 'Role/user.role';
import { IsEnum } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'Foydalanuvchi ismi',
    example: 'Updated John Doe',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Telefon raqami',
    example: '+998901234567',
  })
  phone?: string;

  @ApiPropertyOptional({
      description: 'Foydalanuvchi roli',
      enum: Role,
      example: Role.USER_FIZ,
    })
    @IsEnum(Role, { message: 'Noto‘g‘ri foydalanuvchi turi' })
    role?: Role;

  @ApiPropertyOptional({
    description: 'Parol',
    example: 'UpdatedStrongPassword123',
  })
  password?: string;

  @ApiPropertyOptional({
    description: 'Region ID',
    example: 2,
  })
  regionId?: number;

  @ApiPropertyOptional({
    description: 'STIR (Soliq identifikatsiya raqami)',
    example: 987654321,
  })
  stir?: number;

  @ApiPropertyOptional({
    description: 'MFO (Bank kod)',
    example: 54321,
  })
  mfo?: number;

  @ApiPropertyOptional({
    description: 'HR',
    example: 6000,
  })
  hr?: number;

  @ApiPropertyOptional({
    description: 'Bank nomi',
    example: 'Yangi Bank',
  })
  bank?: string;

  @ApiPropertyOptional({
    description: 'OKED (Faoliyat turi kodi)',
    example: 654321,
  })
  oked?: number;

  @ApiPropertyOptional({
    description: 'Manzil',
    example: 'Samarqand, Registon tumani',
  })
  manzil?: string;
}
