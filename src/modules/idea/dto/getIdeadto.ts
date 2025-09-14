import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetAllIdeaDto {
  @ApiPropertyOptional({ example: 10, description: 'Number of items to return (limit)' })
  @IsInt()
  @IsOptional()
  limit: number;

  @ApiPropertyOptional({ example: 0, description: 'Number of items to skip (offset)' })
  @IsInt()
  @IsOptional()
  offset: number;

  @ApiPropertyOptional({ example: 'John Michael Doe', description: 'Filter by full name' })
  @IsString()
  @IsOptional()
  fullName: string;
}
