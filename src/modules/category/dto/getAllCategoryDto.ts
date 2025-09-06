import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetAllCategoryDto {
  @ApiPropertyOptional({ example: 0, description: 'Offset (qaysi elementdan boshlab olish)' })
  @IsOptional()
  @IsInt()
  offset: number;

  @ApiPropertyOptional({ example: 10, description: 'Nechta element olish kerakligi' })
  @IsOptional()
  @IsInt()
  limit: number;

  @ApiPropertyOptional({ example: 'Uylar', description: 'Kategoriya nomi bo‘yicha filtr' })
  @IsOptional()
  @IsString()
  name: string;
}
