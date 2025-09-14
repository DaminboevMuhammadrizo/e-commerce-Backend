import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from "class-validator"
import { ListingType } from "src/common/types/EnumTypes"

export class GetTopAccomidationDto {


  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  offset: number

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt()
  limit: number

  @ApiPropertyOptional({ example: 600.0 })
  @IsOptional()
  @IsNumber()
  maxPrice: number

  @ApiPropertyOptional({ example: 100.0 })
  @IsOptional()
  @IsNumber()
  minPrice: number

  @ApiPropertyOptional({ example: 'Vila' })
  @IsString()
  @IsOptional()
  title: string

  @ApiPropertyOptional({ example: ListingType.ForRent, enum: ListingType })
  @IsOptional()
  @IsEnum(ListingType)
  listing_type: ListingType
}
