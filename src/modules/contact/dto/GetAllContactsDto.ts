import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional } from 'class-validator';

export class GetAllConatctsDto {
  @ApiPropertyOptional({
    example: 0,
    description: 'Offset (qaysi elementdan boshlab olish)',
  })
  @IsOptional()
  @IsInt()
  offset: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Nechta element olish kerakligi',
  })
  @IsOptional()
  @IsInt()
  limit: number;

  @ApiPropertyOptional({
    example: '2025-09-06',
    description: 'Foydalanuvchi tanlagan sana (faqat yil-oy-kun)',
    type: 'string',
    format: 'date',
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  date: Date;
}
