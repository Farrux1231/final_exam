import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { orderEnum } from 'enum/order-enum';

export class CreateBasketDto {

  @ApiPropertyOptional({
    description: 'ID of the profession associated with the basket (optional)',
    example: 2,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  professionId?: number;

  @ApiPropertyOptional({
    description: 'ID of the tools associated with the basket (optional)',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  toolsId?: number;

  @ApiPropertyOptional({
    description: 'ID of the level associated with the basket (optional)',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  levelId?: number;

  @ApiProperty({
    description: 'Total price of the basket',
    example: 100,
  })
  @IsInt()
  @IsPositive()
  totalPrice: number;

  @ApiProperty({
    description: 'Time unit for the work (e.g., "hour", "day")',
    enum: orderEnum,
    example: orderEnum.HOUR,
  })
  @IsString()
  @IsNotEmpty()
  timeUnit: string;

  @ApiProperty({
    description: 'Total work time in the specified time unit',
    example: 5,
  })
  @IsInt()
  @IsPositive()
  workTime: number;
}
