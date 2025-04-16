import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, Min, IsPositive } from 'class-validator';

export class CreateMasterProfessionDto {
  @ApiPropertyOptional({
    description: 'Minimum working hours (optional)',
    example: 4,
  })
  @IsOptional()
  @IsInt()
  minWorking_h?: number; 

  @ApiProperty({
    description: 'Profession ID',
    example: 1,
  })
  @IsInt()
  professionId: number; 

  @ApiProperty({
    description: 'Level ID',
    example: 1,
  })
  @IsInt()
  levelId: number; 

  @ApiPropertyOptional({
    description: 'Hourly price (optional) in Dollar',
    example: 15.5,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price_h?: number; 

  @ApiPropertyOptional({
    description: 'Daily price (optional) in Dollar',
    example: 120.0,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price_d?: number; 

  @ApiProperty({
    description: 'Experience in years',
    example: 3,
  })
  @IsInt()
  experience: number; 

  @ApiProperty({
    description: 'Master ID',
    example: 1,
  })
  @IsInt()
  masterId: number; 
}
