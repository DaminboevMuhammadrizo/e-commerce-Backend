import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class GetAllraintgDto {
  @ApiPropertyOptional({
    example: 0,
    description: 'Offset (start from which record)',
  })
  @IsOptional()
  @IsInt()
  offset: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Number of records to fetch',
  })
  @IsOptional()
  @IsInt()
  limit: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Filter ratings by accommodation ID',
  })
  @IsInt()
  @IsOptional()
  accommodation_id: number;
}
