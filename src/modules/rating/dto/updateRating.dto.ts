import { IsInt, IsNumber, IsOptional, Max } from 'class-validator';

export class UpdateRatingDto {
  @IsInt()
  id: number;

  @IsNumber()
  @Max(5)
  @IsOptional()
  clean: number;

  @IsNumber()
  @Max(5)
  @IsOptional()
  location: number;

  @IsNumber()
  @Max(5)
  @IsOptional()
  communicate: number;
}
