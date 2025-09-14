import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt } from 'class-validator';

export class CreateLikeDto {
  @ApiProperty({ example: true, description: 'Like status (true = liked, false = unliked)' })
  @IsBoolean()
  like: boolean;

  @ApiProperty({ example: 1, description: 'Accommodation ID to like/unlike' })
  @IsInt()
  accommodation_id: number;
}
