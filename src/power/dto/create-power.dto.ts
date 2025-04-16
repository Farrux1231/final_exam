import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePowerDto {
  @ApiProperty({
    description: 'The name of the power',
    example: '120w',
  })
  @IsString()
  name: string;
}
