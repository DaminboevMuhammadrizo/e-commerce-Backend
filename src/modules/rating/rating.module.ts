import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { PrismaModule } from 'src/Database/prisma.module';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

@Module({
  imports: [PrismaModule, JwtModule.register(JwtAccsesToken)],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
