import { Module } from '@nestjs/common';
import { PrismaModule } from './Database/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AccomodationModule } from './modules/accomodation/accomodation.module';
import { AccomodationImgModule } from './modules/accomodation-img/accomodation-img.module';
import { CategoryModule } from './modules/category/category.module';
import { RatingModule } from './modules/rating/rating.module';
import { ContactModule } from './modules/contact/contact.module';
import { LikesModule } from './modules/likes/likes.module';
import { AuthModule } from './modules/auth/auth.module';
import { VerificationsModule } from './modules/verifications/verifications.module';
import { MailerModule } from './common/config/mailer/mailer.module';
import { RedisModule } from './common/config/redis/redis.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, AccomodationModule, AccomodationImgModule, CategoryModule, RatingModule, ContactModule, LikesModule, VerificationsModule, MailerModule, RedisModule],
})
export class AppModule {}
