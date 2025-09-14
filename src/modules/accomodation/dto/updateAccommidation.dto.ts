import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ListingType } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAccommidationDto {
  @IsInt()
  id: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @ApiProperty({
    type: [String],
    description: 'Image file names',
    example: ['img1.jpg', 'img2.png'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  img?: string[];

  @ApiProperty({ example: 'Luxury Villa' })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ example: 3 })
  @IsInt()
  @IsOptional()
  beds: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  @IsOptional()
  baths: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  garage: number;

  @ApiProperty({ example: 1500 })
  @IsInt()
  @IsOptional()
  sq_ft: number;

  @ApiProperty({ example: 250000.0 })
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiPropertyOptional({ example: 15000.0 })
  @IsNumber()
  @IsOptional()
  discount?: number;

  @ApiProperty({
    description: 'Year the building was constructed',
    example: 2021,
  })
  @IsInt()
  @IsOptional()
  build_year: number;

  @ApiProperty({ example: 'Beautiful villa with sea view' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({
    type: [String],
    example: ['doc1.pdf', 'brochure.pdf'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  documents?: string[];

  @ApiPropertyOptional({
    example: 'https://maps.google.com/?q=40.7128,-74.0060',
  })
  @IsString()
  @IsOptional()
  map_url?: string;

  @ApiProperty({ example: 40.7128 })
  @IsNumber()
  @IsOptional()
  latitude: number;

  @ApiProperty({ example: -74.006 })
  @IsNumber()
  @IsOptional()
  longitude: number;

  @ApiProperty({ example: 'USA' })
  @IsString()
  @IsOptional()
  country: string;

  @ApiPropertyOptional({
    type: [String],
    description: 'Selected features (e.g., WiFi, Gym)',
    example: ['WiFi', 'Gym', 'Pool'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  extra_features?: string[];

  @ApiProperty({ enum: ListingType, example: ListingType.ForSale })
  @IsEnum(ListingType)
  @IsOptional()
  listing_type: ListingType;

  @ApiProperty({ example: 2 })
  @IsInt()
  @IsOptional()
  category_id: number;

  @ApiPropertyOptional({ example: 'intro-video.mp4', nullable: true })
  @IsOptional()
  @IsString()
  introVideo?: string | null;
}
