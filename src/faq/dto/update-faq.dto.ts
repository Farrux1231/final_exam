import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateFaqDto } from './create-faq.dto';

export class UpdateFaqDto extends PartialType(CreateFaqDto) {
  @ApiProperty({
    description: 'The question in the FAQ',
    example: 'What is NestJS?',
    required: false, 
  })
  question?: string;

  @ApiProperty({
    description: 'The answer in the FAQ',
    example: 'NestJS is a framework for building scalable and efficient server-side applications.',
    required: false, 
  })
  answer?: string;

}
