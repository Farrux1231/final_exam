import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRegionDto } from './create-region.dto';

export class UpdateRegionDto extends PartialType(CreateRegionDto) {
  @ApiProperty({
    description: 'Region name',
    example: 'Toshkent',
    required: false, 
  })
  @IsOptional() 
  @IsString({ message: 'Region name must be a string' })
  @MinLength(2, { message: 'Region name must be at least 2 characters long' })
  name?: string;
}
