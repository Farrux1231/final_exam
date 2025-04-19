import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class CreateProfessionLevelDto {
  @ApiProperty({
    description: 'ID of the profession.',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  professionId: number;

  @ApiProperty({
    description: 'ID of the level.',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  levelId: number;

  @ApiProperty({
    description: 'Minimum working hours.',
    example: 4,
  })
  @IsInt()
  @IsPositive()
  minWorking_h: number;

  @ApiProperty({
    description: 'Hourly price in dollars.',
    example: 100,
  })
  @IsInt()
  @IsPositive()
  price_h: number;

  @ApiProperty({
    description: 'Daily price in dollars.',
    example: 800,
  })
  @IsInt()
  @IsPositive()
  price_d: number;
}
