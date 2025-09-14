import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, Max } from 'class-validator';

export class UpdateRatingDto {
  @ApiProperty({ example: 1, description: 'ID of the rating to update' })
  @IsInt()
  id: number;

  @ApiPropertyOptional({ example: 4.7, description: 'Updated cleanliness rating' })
  @IsNumber()
  @Max(5)
  @IsOptional()
  clean: number;

  @ApiPropertyOptional({ example: 4.8, description: 'Updated location rating' })
  @IsNumber()
  @Max(5)
  @IsOptional()
  location: number;

  @ApiPropertyOptional({ example: 4.9, description: 'Updated communication rating' })
  @IsNumber()
  @Max(5)
  @IsOptional()
  communicate: number;
}
