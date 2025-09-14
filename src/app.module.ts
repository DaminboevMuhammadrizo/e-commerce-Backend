import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { MailerModule } from './common/config/mailer/mailer.module';
import { RedisModule } from './common/config/redis/redis.module';
import { PrismaModule } from './Database/prisma.module';
import { AccomodationModule } from './modules/accomodation/accomodation.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { ContactModule } from './modules/contact/contact.module';
import { LikesModule } from './modules/likes/likes.module';
import { RatingModule } from './modules/rating/rating.module';
import { UsersModule } from './modules/users/users.module';
import { VerificationsModule } from './modules/verifications/verifications.module';
import { FileModule } from './modules/file/file.module';
import { IdeaModule } from './modules/idea/idea.module';
dotenv.config();


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    PrismaModule,
    UsersModule,
    AccomodationModule,
    CategoryModule,
    RatingModule,
    ContactModule,
    LikesModule,
    VerificationsModule,
    MailerModule,
    RedisModule,
    FileModule,
    IdeaModule,
  ],
})
export class AppModule {}
