import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsBoolean } from 'class-validator';

export class CreateProfessionDto {
  @ApiProperty({
    description: 'Name of the profession.',
    example: 'Software Development',
  })
  @IsString()
  name: string; 

  @ApiProperty({
    description: 'Image URL representing the profession.',
    example: 'https://example.com/profession-image.jpg',
  })
  @IsUrl()
  image: string; 

  @ApiProperty({
    description: 'Whether the profession is active (true/false).',
    example: 'true',
  })
  @IsString()
  isActive: string; 
}
