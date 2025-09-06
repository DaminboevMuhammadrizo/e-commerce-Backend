import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { PrismaModule } from 'src/Database/prisma.module';
import { AccomodationImgController } from './accomodation-img.controller';
import { AccomodationImgService } from './accomodation-img.service';

@Module({
  imports: [PrismaModule, JwtModule.register(JwtAccsesToken)],
  controllers: [AccomodationImgController],
  providers: [AccomodationImgService],
})
export class AccomodationImgModule {}
