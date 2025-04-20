import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateLevelDto } from './create-level.dto';

export class UpdateLevelDto extends PartialType(CreateLevelDto) {
  @ApiProperty({
    example: 'Beginner',
    description: 'Level name',
    required: false, 
  })
  @IsOptional()
  @IsString()
  name?: string;
}
