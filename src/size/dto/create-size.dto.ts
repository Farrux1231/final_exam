import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSizeDto {
  @ApiProperty({
    description: 'The name of the size',
    example: 'Medium',
  })
  @IsString()
  name: string;
}
