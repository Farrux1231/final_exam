import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLevelDto {
  @ApiProperty({ example: 'Beginner', description: 'Level nomi' })
  @IsString()
  name: string;
}
