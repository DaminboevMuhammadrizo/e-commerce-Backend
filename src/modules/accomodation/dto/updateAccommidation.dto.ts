import { ApiPropertyOptional } from '@nestjs/swagger';
import { ListingType } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAccommidationDto {
  @ApiPropertyOptional()
  @IsInt()
  id: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  beds?: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  baths?: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  garage?: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  sq_ft?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  discount?: number;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @IsDate()
  @IsOptional()
  build_year?: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ type: 'object', additionalProperties: true })
  @IsJSON()
  @IsOptional()
  documents?: JSON;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  map_url?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  latitude?: number; // 🔧 Was wrongly typed as `string`

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({ type: 'object', additionalProperties: true })
  @IsJSON()
  @IsOptional()
  extra_features?: JSON;

  @ApiPropertyOptional({ enum: ListingType })
  @IsEnum(ListingType)
  @IsOptional()
  listing_type?: ListingType;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  user_id?: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  category_id?: number;
}
