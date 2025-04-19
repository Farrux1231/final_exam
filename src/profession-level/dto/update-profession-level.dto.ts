import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateProfessionLevelDto {
  @ApiPropertyOptional({
    description: 'ID of the profession.',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  professionId?: number;

  @ApiPropertyOptional({
    description: 'ID of the level.',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  levelId?: number;

  @ApiPropertyOptional({
    description: 'Minimum working hours.',
    example: 4,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  minWorking_h?: number;

  @ApiPropertyOptional({
    description: 'Hourly price in dollars.',
    example: 100,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  price_h?: number;

  @ApiPropertyOptional({
    description: 'Daily price in dollars.',
    example: 800,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  price_d?: number;
}
