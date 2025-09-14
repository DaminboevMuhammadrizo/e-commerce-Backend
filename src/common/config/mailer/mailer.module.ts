import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { MailerService } from './mailer.service';
dotenv.config();

@Global()
@Module({
  imports: [
    NestMailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS
        }
      },
      defaults: {
        from: `LearnUp <${process.env.MAILER_USER}>`,
        subject: 'Verification Code !'
      },
      template: {
        dir: join(process.cwd(), 'src', 'template'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    })
  ],
  providers: [MailerService],
  exports: [MailerService]
})
export class MailerModule {}
