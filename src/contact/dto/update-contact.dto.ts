import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';
import { IsOptional } from 'class-validator';

export class UpdateContactDto extends PartialType(CreateContactDto) {
  @IsOptional()
  @ApiProperty({
    description: 'The link associated with the contact info',
    example: 'https://example.com',
    required: false, 
  })
  link?: string;

  @IsOptional()
  @ApiProperty({
    description: 'The email address associated with the contact info',
    example: 'example@example.com',
    required: false, 
  })
  email?: string;

  @IsOptional()
  @ApiProperty({
    description: 'The phone number associated with the contact info',
    example: '+1234567890',
    required: false, 
  })
  phone?: string;
}
