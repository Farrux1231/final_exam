import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({
    description: 'Region nomi',
    example: 'Toshkent',
  })
  @IsString({ message: 'Region nomi matn bo‘lishi kerak' })
  @MinLength(2, { message: 'Region nomi kamida 2 ta belgidan iborat bo‘lishi kerak' })
  name: string;
}
