import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsInt, IsBoolean, IsOptional, Min, MinLength, IsUrl } from 'class-validator';

export class CreateToolDto {
  @ApiProperty({ description: 'Name of the tool', example: 'Hammer' })
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @ApiProperty({ description: 'Description of the tool', example: 'A heavy-duty hammer used for construction.' })
  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  desc: string;

  @ApiProperty({ description: 'Hourly price of the tool', example: 10.5 })
  @IsNumber()
  @Min(0, { message: 'Hourly price must be a positive number' })
  price_h: number;

  @ApiProperty({ description: 'Daily price of the tool', example: 50.0 })
  @IsNumber()
  @Min(0, { message: 'Daily price must be a positive number' })
  price_d: number;

  @ApiProperty({ description: 'Quantity available in stock', example: 20 })
  @IsInt()
  @Min(0, { message: 'Quantity must be a non-negative integer' })
  quantity: number;

  @IsInt()
  code: number;

  @ApiProperty({ description: 'ID of the brand associated with the tool', example: 1 })
  @IsInt()
  brandId: number;

  @ApiProperty({ description: 'Indicates if the tool is active', example: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ description: 'ID of the power attribute (optional)', example: 2, required: false })
  @IsOptional()
  @IsInt()
  powerId?: number;

  @ApiProperty({ description: 'ID of the size attribute (optional)', example: 3, required: false })
  @IsOptional()
  @IsInt()
  sizeId?: number;

  @ApiProperty({ description: 'Image URL of the tool', example: 'http://example.com/tool.jpg' })
  @IsString()
  @IsUrl({}, { message: 'Image must be a valid URL' })
  image: string;
}
