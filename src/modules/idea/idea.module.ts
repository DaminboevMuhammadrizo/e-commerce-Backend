import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { PrismaModule } from 'src/Database/prisma.module';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';

@Module({
  imports: [PrismaModule, JwtModule.register(JwtAccsesToken)],
  controllers: [IdeaController],
  providers: [IdeaService]
})
export class IdeaModule { }
