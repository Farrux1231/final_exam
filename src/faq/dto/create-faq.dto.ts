import { ApiProperty } from '@nestjs/swagger';

export class CreateFaqDto {
  @ApiProperty({
    description: 'The question for the FAQ',
    example: 'What is the return policy?',
  })
  quiteions: string;

  @ApiProperty({
    description: 'The answer to the FAQ question',
    example: 'You can return the product within 30 days of purchase.',
  })
  answer: string;
}
