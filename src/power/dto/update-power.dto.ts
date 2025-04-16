import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePowerDto } from './create-power.dto';

export class UpdatePowerDto extends PartialType(CreatePowerDto) {
  @ApiProperty({
    description: 'The name of the power',
    example: '120w',
    required: false,
  })
  name?: string;
}
