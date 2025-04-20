import { IsString, IsNumber, IsOptional, IsBoolean, IsUrl, IsPhoneNumber } from 'class-validator';
import { CreateMasterDto, CreateMasterProfessionDto } from './create-master.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMasterDto extends PartialType(CreateMasterDto) {
  @ApiPropertyOptional({
    description: "Masterning to'liq ismi",
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  fullname?: string;

  @ApiPropertyOptional({
    description: 'Telefon raqam (unikal)',
    example: '+998901234567',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiPropertyOptional({
    description: "Masterning aktiv yoki noaktiv holati",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

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

  @ApiPropertyOptional({
    description: "Master haqida qisqacha ma'lumot",
    example: 'Experienced professional in software development.',
  })
  @IsOptional()
  @IsString()
  about?: string;

  @ApiPropertyOptional({
    type: [CreateMasterProfessionDto], 
    description: 'List of master professions',
  })
  @IsOptional()
  masterProfessions?: CreateMasterProfessionDto[];
}
