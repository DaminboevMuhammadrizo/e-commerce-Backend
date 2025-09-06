import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

export class CreateAccommidationDto {
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsInt()
  beds: number;

  @ApiProperty()
  @IsInt()
  baths: number;

  @ApiProperty()
  @IsInt()
  garage: number;

  @ApiProperty()
  @IsInt()
  sq_ft: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  discount?: number;

  @ApiProperty({ type: String, format: 'date-time' })
  @IsDate()
  build_year: Date;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ type: 'object', additionalProperties: true })
  @IsJSON()
  documents: JSON;

  @ApiPropertyOptional()
  @IsString()
  map_url?: string;

  @ApiProperty()
  @IsNumber()
  latitude: number;

  @ApiProperty()
  @IsNumber()
  longitude: number;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty({ type: 'object', additionalProperties: true })
  @IsJSON()
  extra_features: JSON;

  @ApiProperty({ enum: ListingType })
  @IsEnum(ListingType)
  listing_type: ListingType;

  @ApiProperty()
  @IsInt()
  user_id: number;

  @ApiProperty()
  @IsInt()
  category_id: number;

  @ApiPropertyOptional()
  @IsString()
  introVideo?: string;
}
