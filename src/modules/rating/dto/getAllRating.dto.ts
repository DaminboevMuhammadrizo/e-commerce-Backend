import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class GetAllraintgDto {
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
    example: 1,
    description: 'accommodation ga oid ratinglarni olish !',
  })
  @IsInt()
  @IsOptional()
  accommodation_id: number;
}
