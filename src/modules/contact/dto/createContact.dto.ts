import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsInt,
  IsMobilePhone,
  IsString,
  Matches,
} from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    example: '2025-09-06',
    description: 'Foydalanuvchi tanlagan sana (faqat yil-oy-kun)',
    type: 'string',
    format: 'date',
  })
  @Type(() => Date)
  @IsDate()
  date: Date;

  @ApiProperty({
    example: '14:30',
    description: 'Tanlangan vaqt (soat:daqiqa formatida)',
    type: 'string',
    format: 'time',
  })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Time must be in HH:mm format',
  })
  time: string;

  @ApiProperty({
    example: 'Ali Valiyev',
    description: 'Foydalanuvchining ismi va familiyasi',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Telefon raqam (O‘zbekiston formati)',
  })
  @IsMobilePhone('uz-UZ', {}, { message: 'Telefon raqam noto‘g‘ri' })
  phone: string;

  @ApiProperty({
    example: 'ali@example.com',
    description: 'Foydalanuvchining email manzili',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Men ushbu uy haqida ko‘proq ma’lumot olmoqchiman.',
    description: 'Foydalanuvchining xabari',
  })
  @IsString()
  message: string;

  @ApiProperty({
    example: 1,
    description: 'Kontaktni yuborgan foydalanuvchining IDsi',
  })
  @IsInt()
  user_id: number;

  @ApiProperty({
    example: 5,
    description: 'Aloqa yuborilgan accommodation IDsi',
  })
  @IsInt()
  accommodation_id: number;
}
