import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class MasterRatingDto {
  @ApiProperty({
    description: 'The rating star given by the master',
    example: 4.5,
  })
  @IsNumber()
  star: number;

  @ApiProperty({
    description: 'The ID of the master providing the rating',
    example: 'master_id',
  })
  @IsNumber()
  masterId: number;

  @IsNumber()
  commentId: number;
}

export class CreateCommentDto {
  @ApiProperty({
    description: 'The message for the comment',
    example: 'Good job',
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'The ID of the associated order',
    example: 1,
  })
  @IsNumber()
  orderId: number;

  @ApiProperty({
    description: 'An array of master ratings',
    example: [
      {
        star: 4.5,
        masterId: 1,
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true }) 
  @Type(() => MasterRatingDto) 
  master_ratings: MasterRatingDto[];
}
