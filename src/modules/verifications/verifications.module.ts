import { Module } from '@nestjs/common';
import { VerificationsController } from './verifications.controller';
import { VerificationsService } from './verifications.service';
import { PrismaModule } from 'src/Database/prisma.module';
import { RedisModule } from 'src/common/config/redis/redis.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [PrismaModule, RedisModule, MailerModule],
  controllers: [VerificationsController],
  providers: [VerificationsService],
  exports: [VerificationsService]
})
export class VerificationsModule {}
