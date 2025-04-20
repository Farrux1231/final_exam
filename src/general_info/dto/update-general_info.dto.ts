import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneralInfoDto } from './create-general_info.dto';

export class UpdateGeneralInfoDto extends PartialType(CreateGeneralInfoDto) {
  @ApiProperty({
    description: 'The link associated with the general info',
    example: 'https://example.com',
    required: false, 
  })
  link?: string;

  @ApiProperty({
    description: 'The email address associated with the general info',
    example: 'example@example.com',
    required: false, 
  })
  email?: string;

  @ApiProperty({
    description: 'The phone number associated with the general info',
    example: '+1234567890',
    required: false, 
  })
  phone?: string;
}
