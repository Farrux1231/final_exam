import { ApiProperty } from '@nestjs/swagger';

export class CreateGeneralInfoDto {
  @ApiProperty({
    description: 'The link associated with the general info',
    example: 'https://example.com',
  })
  link: string;

  @ApiProperty({
    description: 'The email address associated with the general info',
    example: 'example@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The phone number associated with the general info',
    example: '+1234567890',
  })
  phone: string;
}
