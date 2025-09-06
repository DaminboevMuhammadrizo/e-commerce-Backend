import { Module } from '@nestjs/common';
import { PrismaModule } from './Database/prisma.module';

@Module({
  imports: [PrismaModule],
})
export class AppModule {}
