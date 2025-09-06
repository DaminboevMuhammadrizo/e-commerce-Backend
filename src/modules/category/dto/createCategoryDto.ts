import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Yangi kategoriya', description: 'Kategoriya nomi' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
