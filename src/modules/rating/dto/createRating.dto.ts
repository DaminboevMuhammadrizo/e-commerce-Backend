import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, Max } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({ example: 4.5, description: 'Cleanliness rating (max 5)' })
  @IsNumber()
  @Max(5)
  clean: number;

  @ApiProperty({ example: 4.2, description: 'Location rating (max 5)' })
  @IsNumber()
  @Max(5)
  location: number;

  @ApiProperty({ example: 5, description: 'Communication rating (max 5)' })
  @IsNumber()
  @Max(5)
  communicate: number;

  @ApiProperty({ example: 1, description: 'Accommodation ID' })
  @IsInt()
  accommodation_id: number;
}
