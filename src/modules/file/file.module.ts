import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/Database/prisma.module';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [PrismaModule],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule { }
