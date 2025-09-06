import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { PrismaModule } from 'src/Database/prisma.module';
import { AccomodationController } from './accomodation.controller';
import { AccomodationService } from './accomodation.service';

@Module({
  imports: [PrismaModule, JwtModule.register(JwtAccsesToken)],
  controllers: [AccomodationController],
  providers: [AccomodationService],
})
export class AccomodationModule {}
