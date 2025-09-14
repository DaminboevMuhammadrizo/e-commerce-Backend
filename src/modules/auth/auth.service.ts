import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compirePassword } from 'src/common/config/bcrypt/compire';
import { hashPassword } from 'src/common/config/bcrypt/hash';
import { VerificationTypes } from 'src/common/types/EnumTypes';
import { JwtPayload } from 'src/common/types/InterfaceTypes';
import { PrismaService } from 'src/Database/prisma.service';
import { VerificationsService } from '../verifications/verifications.service';
import { LoginDto } from './dto/login';
import { RefreshTokenDto } from './dto/refresh-token';
import { RegisterDto } from './dto/register';
import { ResetPasswordDto } from './dto/reset-password';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly verifyService: VerificationsService,
  ) {}

  private async generateToken(payload: JwtPayload, AccsesTokenOnly = false) {
    const accessToken = await this.jwtService.signAsync(payload);
    if (AccsesTokenOnly) return { accessToken };

    const refreshToken = await this.jwtService.signAsync({ id: payload.id });
    return { accessToken, refreshToken };
  }

  async register(payload: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (existingUser) {
      throw new ConflictException({
        success: false,
        message: 'Email already exists !',
      });
    }

    const isOtpValid = await this.verifyService.checkConfirmOtp({
      type: VerificationTypes.REGISTER,
      email: payload.email,
      otp: String(payload.otp),
    });

    if (!isOtpValid) {
      throw new BadRequestException({
        success: false,
        messsage: 'Invalid or expired OTP',
      });
    }

    const hashedPassword = await hashPassword(payload.password);

    const user = await this.prisma.user.create({
      data: {
        email: payload.email,
        firstName: payload.firstName,
        password: hashedPassword,
        lastName: payload.lastName
      },
    });

    return this.generateToken({ id: user.id, role: user.role });
  }

  async login(payload: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      throw new NotFoundException({
        success: false,
        message: 'Invalid email or password!',
      });
    }

    const isPasswordValid = await compirePassword(
      payload.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid email or password!');
    }

    return this.generateToken({ id: user.id, role: user.role });
  }

  async resetPassword(payload: ResetPasswordDto) {
    await this.verifyService.checkConfirmOtp({
      type: VerificationTypes.RESET_PASSWORD,
      otp: String(payload.otp),
      email: payload.email,
    });

    await this.prisma.user.update({
      where: { email: payload.email },
      data: { password: await hashPassword(payload.password) },
    });

    return { success: true, message: 'Password successfully updated!' };
  }

  async refreshToken(payload: RefreshTokenDto) {
    try {
      const data = await this.jwtService.verifyAsync(payload.refresh_token);
      const user = await this.prisma.user.findUnique({
        where: { id: data.id },
      });

      if (!user) {
        throw new NotFoundException('Invalid JWT!');
      }

      return this.generateToken({ id: user.id, role: user.role }, true);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
