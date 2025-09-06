import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllAccommidationDto {
  @ApiPropertyOptional({ description: 'Pagination offset' })
  @IsInt()
  @IsOptional()
  offset: number;

  @ApiPropertyOptional({ description: 'Pagination limit' })
  @IsInt()
  @IsOptional()
  limit: number;

  @ApiPropertyOptional({ description: 'Filter by title' })
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Filter by price', example: 1000 })
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiPropertyOptional({
    description: 'Filter by build year',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsOptional()
  build_year: Date;

  @ApiPropertyOptional({ description: 'Filter by country' })
  @IsString()
  @IsOptional()
  country: string;
}
