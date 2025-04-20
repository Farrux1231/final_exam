import { IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({
    description: 'Foydalanuvchining ismi',
    example: 'John',
  })
  @IsNotEmpty({ message: 'Ism bo\'sh bo\'lishi mumkin emas.' })
  @IsString({ message: 'Ism satr bo\'lishi kerak.' })
  name: string;

  @ApiProperty({
    description: 'Foydalanuvchining familiyasi',
    example: 'Doe',
  })
  @IsNotEmpty({ message: 'Familiya bo\'sh bo\'lishi mumkin emas.' })
  @IsString({ message: 'Familiya satr bo\'lishi kerak.' })
  surname: string;

  @ApiProperty({
    description: 'Foydalanuvchining telefon raqami',
    example: '+123456789',
  })
  @IsNotEmpty({ message: 'Telefon raqami bo\'sh bo\'lishi mumkin emas.' })
  @IsPhoneNumber(undefined, { message: 'To\'g\'ri telefon raqamini kiriting.' })
  phone: string;

  @ApiProperty({
    description: 'Foydalanuvchining manzili',
    example: '123 Elm Street',
  })
  @IsNotEmpty({ message: 'Manzil bo\'sh bo\'lishi mumkin emas.' })
  @IsString({ message: 'Manzil satr bo\'lishi kerak.' })
  address: string;

  @ApiProperty({
    description: 'Foydalanuvchining xabari yoki izohi',
    example: 'Bu xizmat haqida ko\'proq ma\'lumot olishni istayman.',
  })
  @IsNotEmpty({ message: 'Xabar bo\'sh bo\'lishi mumkin emas.' })
  @IsString({ message: 'Xabar satr bo\'lishi kerak.' })
  message: string;
}
