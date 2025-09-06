import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/Database/prisma.module';
import { VerificationsModule } from '../verifications/verifications.module';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from 'src/common/config/redis/redis.module';

@Module({
  imports: [PrismaModule, RedisModule, JwtModule.register(JwtAccsesToken), VerificationsModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
