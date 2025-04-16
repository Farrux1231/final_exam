import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsPhoneNumber } from 'class-validator';

export class VerifyUserDto {

  @ApiProperty({
    description: 'Telefon raqami',
    example: '+998901234567',
  })
  @IsPhoneNumber(null!, { message: 'Telefon raqam to‘g‘ri formatda bo‘lishi kerak' })
  phone: string;

  @ApiProperty({
    description: 'otp parol',
    example: '000000',
  })
  @IsString()
  @MinLength(6, { message: 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak' })
  otp: string;

}
