import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsInt, IsBoolean, Min, MinLength, IsUrl } from 'class-validator';
import { CreateToolDto } from './create-tool.dto';

export class UpdateToolDto extends PartialType(CreateToolDto) {
  @ApiPropertyOptional({ description: 'Name of the tool', example: 'Hammer' })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name?: string;

  @ApiPropertyOptional({ description: 'Description of the tool', example: 'A heavy-duty hammer used for construction.' })
  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  desc?: string;

  @ApiPropertyOptional({ description: 'Hourly price of the tool', example: 10.5 })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Hourly price must be a positive number' })
  price_h?: number;

  @ApiPropertyOptional({ description: 'Daily price of the tool', example: 50.0 })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Daily price must be a positive number' })
  price_d?: number;

  @ApiPropertyOptional({ description: 'Quantity available in stock', example: 20 })
  @IsOptional()
  @IsInt()
  @Min(0, { message: 'Quantity must be a non-negative integer' })
  quantity?: number;

  @ApiPropertyOptional({ description: 'ID of the brand associated with the tool', example: 1 })
  @IsOptional()
  @IsInt()
  brandId?: number;

  @ApiPropertyOptional({ description: 'Indicates if the tool is active', example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'ID of the power attribute (optional)', example: 2 })
  @IsOptional()
  @IsInt()
  powerId?: number;

  @ApiPropertyOptional({ description: 'ID of the size attribute (optional)', example: 3 })
  @IsOptional()
  @IsInt()
  sizeId?: number;

  @ApiPropertyOptional({ description: 'Image URL of the tool', example: 'http://example.com/tool.jpg' })
  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Image must be a valid URL' })
  image?: string;
}
