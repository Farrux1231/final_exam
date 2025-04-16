import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSizeDto } from './create-size.dto';

export class UpdateSizeDto extends PartialType(CreateSizeDto) {
  @ApiProperty({ required: false })
  name?: string;

}
