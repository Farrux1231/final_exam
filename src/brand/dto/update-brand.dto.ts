import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { CreateBrandDto } from './create-brand.dto';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  @ApiProperty({
    description: 'The name of the brand',
    example: 'Turbo',
    required: false,
  })
  name?: string;
}
