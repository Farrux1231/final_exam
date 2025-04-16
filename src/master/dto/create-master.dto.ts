import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean, IsUrl, IsPhoneNumber } from 'class-validator';

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
}
