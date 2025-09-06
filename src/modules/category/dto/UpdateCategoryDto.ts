import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({ example: 1, description: 'Kategoriya IDsi' })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiPropertyOptional({ example: 'Yangi nom', description: 'Kategoriya nomini o‘zgartirish' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'new-img.jpg', description: 'Yangi rasm nomi' })
  @IsOptional()
  @IsString()
  img?: string;

  @ApiPropertyOptional({ example: 'new-icon.png', description: 'Yangi icon nomi' })
  @IsOptional()
  @IsString()
  icon_img?: string;
}
