import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { orderEnum } from 'enum/order-enum';
import { Pay_type } from 'enum/payment_type-enum';

class CreateOrderProductDto {
  @IsString()
  isActive: string;

  @ApiProperty({ description: 'Time unit for the order product',enum:orderEnum, example: orderEnum.HOUR })
  @IsEnum(orderEnum, { message: 'Wrong timeUnit' })
  timeUnit: orderEnum;

  @ApiProperty({ description: 'Working time required for the order product', example: 5 })
  @IsInt()
  workingTime: number;

  @ApiProperty({ description: 'Price of the order product', example: 150.0 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Quantity of the order product', example: 2 })
  @IsInt()
  count: number;

  @ApiProperty({ description: 'Tool ID associated with the order product', example: 1, required: false })
  @IsOptional()
  @IsInt()
  toolId?: number;

  @ApiProperty({ description: 'Level ID associated with the order product', example: 2, required: false })
  @IsOptional()
  @IsInt()
  levelId?: number;

  @ApiProperty({ description: 'Profession ID associated with the order product', example: 3, required: false })
  @IsOptional()
  @IsInt()
  professionId?: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Total cost of the order', example: 300.5 })
  @IsNumber()
  total: number;

  @ApiProperty({ description: 'Location of the order', example: 'New York' })
  @IsString()
  location: string;

  @ApiProperty({ description: 'Address for the order delivery', example: '123 Main St' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'Payment type for the order',enum:Pay_type, example: Pay_type.CASH })
  @IsEnum(Pay_type, {message:"Wrong payment type"})
  pay_type: string;

  @ApiProperty({ description: 'Indicates whether the order includes delivery', example: true })
  @IsBoolean()
  withDelivery: boolean;

  @IsString()
  status: string = "pending";

  @ApiProperty({ description: 'Additional instructions for the order', example: 'Leave at the front door' })
  @IsString()
  instruction: string;

  @IsInt()
  userId: number;

  @ApiProperty({ type: [CreateOrderProductDto] })
  orderProducts: CreateOrderProductDto[];
}
