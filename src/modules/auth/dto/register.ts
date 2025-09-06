import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from 'src/common/types/EnumTypes';

export class RegisterDto {
  @ApiProperty({ example: 'Muhammadrizo' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Daminoev' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'm701rizo@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: UserRole.BUYER })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: string;

  @ApiProperty({ example: 'admin123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'pictures/img.png' })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({ example: 123456 })
  @IsNumber()
  otp: number;
}
