import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProfessionDto {
  @ApiPropertyOptional({
    description: 'Name of the profession.',
    example: 'Software Development',
  })
  @IsOptional()
  @IsString()
  name?: string; 

  @ApiPropertyOptional({
    description: 'Image URL representing the profession.',
    example: 'https://example.com/profession-image.jpg',
  })
  @IsOptional()
  @IsUrl()
  image?: string; 

  @ApiPropertyOptional({
    description: 'Whether the profession is active (true/false).',
    example: 'true',
  })
  @IsOptional()
  @IsString()
  isActive?: string; 
}
