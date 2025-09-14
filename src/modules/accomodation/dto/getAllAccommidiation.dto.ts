import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllAccommidationDto {
  @ApiPropertyOptional({ description: 'Pagination offset', example: 0 })
  @IsInt()
  @IsOptional()
  offset?: number;

  @ApiPropertyOptional({ description: 'Pagination limit', example: 10 })
  @IsInt()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({
    description: 'Filter by title',
    example: 'Luxury Villa',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Filter by price', example: 1000 })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ description: 'Filter by country', example: 'USA' })
  @IsString()
  @IsOptional()
  country?: string;
}
