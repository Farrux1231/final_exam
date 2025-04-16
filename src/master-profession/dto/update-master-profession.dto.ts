import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, Min, IsPositive } from 'class-validator';

export class UpdateMasterProfessionDto {
  @ApiPropertyOptional({
    description: 'Minimum working hours (optional)',
    example: 4,
  })
  @IsOptional()
  @IsInt()
  minWorking_h?: number; 

  @ApiPropertyOptional({
    description: 'Profession ID (optional)',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  professionId?: number; 

  @ApiPropertyOptional({
    description: 'Level ID (optional)',
    example: 2,
  })
  @IsOptional()
  @IsInt()
  levelId?: number; 

  @ApiPropertyOptional({
    description: 'Hourly price (optional)',
    example: 15.5,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price_h?: number; 

  @ApiPropertyOptional({
    description: 'Daily price (optional)',
    example: 120.0,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price_d?: number; 

  @ApiPropertyOptional({
    description: 'Experience in years (optional)',
    example: 5,
  })
  @IsOptional()
  @IsInt()
  experience?: number; 

  @ApiPropertyOptional({
    description: 'Master ID (optional)',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  masterId?: number; 
}
