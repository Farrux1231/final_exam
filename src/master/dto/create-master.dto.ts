import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsUrl,
  IsPhoneNumber,
  IsArray,
  ValidateNested,
  IsInt,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMasterProfessionDto {
  @ApiPropertyOptional({
    description: 'Minimum working hours (optional)',
    example: 4,
  })
  @IsOptional()
  @IsInt()
  minWorking_h?: number;

  @ApiProperty({
    description: 'Profession ID',
    example: 1,
  })
  @IsInt()
  professionId: number;

  @ApiProperty({
    description: 'Level ID',
    example: 1,
  })
  @IsInt()
  levelId: number;

  @ApiPropertyOptional({
    description: 'Hourly price (optional) in Dollar',
    example: 15.5,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price_h?: number;

  @ApiPropertyOptional({
    description: 'Daily price (optional) in Dollar',
    example: 120.0,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price_d?: number;

  @ApiProperty({
    description: 'Experience in years',
    example: 3,
  })
  @IsInt()
  experience: number;

  @ApiProperty({
    description: 'Master ID',
    example: 1,
  })
  @IsInt()
  masterId: number;
}

export class CreateMasterDto {
  @ApiProperty({
    description: "Masterning to'liq ismi",
    example: 'John Doe',
  })
  @IsString()
  fullname: string;

  @ApiProperty({
    description: 'Telefon raqam (unikal)',
    example: '+998901234567',
  })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    description: "Masterning aktiv yoki noaktiv holati",
    example: false,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiPropertyOptional({
    description: "Masterning rasmi URL",
    example: 'https://example.com/profile-image.jpg',
  })
  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiPropertyOptional({
    description: "Masterning pasport rasmi URL",
    example: 'https://example.com/passport-image.jpg',
  })
  @IsOptional()
  @IsUrl()
  passportImage?: string;

  @ApiPropertyOptional({
    description: 'Masterning reytingi (Float, ixtiyoriy)',
    example: 4.5,
  })
  @IsOptional()
  @IsNumber()
  star?: number;

  @ApiProperty({
    description: "Master haqida qisqacha ma'lumot",
    example: 'Experienced professional in software development.',
  })
  @IsString()
  about: string;

  @ApiProperty({ type: [CreateMasterProfessionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMasterProfessionDto)
  masterProfessions: CreateMasterProfessionDto[];
}
