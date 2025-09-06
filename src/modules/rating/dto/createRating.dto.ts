import { IsInt, IsNumber, Max } from 'class-validator';

export class CreateRatingDto {
  @IsNumber()
  @Max(5)
  clean: number;

  @IsNumber()
  @Max(5)
  location: number;

  @IsNumber()
  @Max(5)
  communicate: number;

  @IsInt()
  accommodation_id: number;
}
