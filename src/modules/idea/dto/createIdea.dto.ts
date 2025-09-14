import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateIdeaDto {
  @ApiProperty({ example: 'John Michael Doe', description: 'Full name of the user' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'I have an idea about improving the system.', description: 'User idea or suggestion' })
  @IsString()
  message: string;
}
