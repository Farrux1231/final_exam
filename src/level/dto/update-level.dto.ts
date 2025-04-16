import { PartialType } from '@nestjs/mapped-types';
import { CreateLevelDto } from './create-level.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateLevelDto extends PartialType(CreateLevelDto) {
  @IsOptional()
  @IsString()
  name?: string; 
}
