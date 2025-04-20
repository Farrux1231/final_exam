import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({
    description: 'Orderning yangi holati',
    example: 'active',
    enum: ['PENDING', 'ACTIVE', 'CANCELLED'],
  })
  status?: string;

  @ApiProperty({
    description: 'Orderga tegishli masterlar ID ro\'yxati',
    example: ['master_id_1', 'master_id_2'],
    type: [String],
  })
  masters?: string[];
}
