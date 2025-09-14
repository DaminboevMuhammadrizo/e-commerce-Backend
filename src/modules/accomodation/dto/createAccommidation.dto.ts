import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ListingType } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAccommidationDto {
  @ApiProperty({ example: true })
  @IsBoolean()
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
  title: string;

  @ApiProperty({ example: 3 })
  @IsInt()
  beds: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  baths: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  garage: number;

  @ApiProperty({ example: 1500 })
  @IsInt()
  sq_ft: number;

  @ApiProperty({ example: 250000.0 })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ example: 15000.0 })
  @IsNumber()
  @IsOptional()
  discount?: number;

  @Type(() => Number)
  @ApiProperty({
    description: 'Year the building was constructed',
    example: 2021,
  })
  @IsInt()
  build_year: number;

  @ApiProperty({ example: 'Beautiful villa with sea view' })
  @IsString()
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
  latitude: number;

  @ApiProperty({ example: -74.006 })
  @IsNumber()
  longitude: number;

  @ApiProperty({ example: 'USA' })
  @IsString()
  country: string;

  @ApiProperty({ example: "Mustaqillik ko'cha 473 uy" })
  @IsString()
  street: string

  @ApiPropertyOptional({
    type: [String],
    description: 'Selected features (e.g., WiFi, Gym)',
    example: ['WiFi', 'Gym', 'Pool'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((v) => v.trim());
    }

    return value;
  })
  extra_features?: string[];


  @ApiProperty({ enum: ListingType, example: ListingType.ForSale })
  @IsEnum(ListingType)
  listing_type: ListingType;


  @ApiProperty({ example: 2 })
  @IsInt()
  category_id: number;

  @ApiPropertyOptional({ example: 'intro-video.mp4', nullable: true })
  @IsOptional()
  @IsString()
  introVideo?: string | null;
}
