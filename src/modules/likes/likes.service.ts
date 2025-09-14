import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) { }





  async create(user_id: number, accommodation_id: number, like: boolean) {
    await this.prisma.like.upsert({
      where: {
        user_id_accommodation_id: {
          user_id,
          accommodation_id
        }
      },
      update: {
        like,
      },
      create: {
        user_id,
        accommodation_id,
        like,
      },
    });


    return { success: true }
  }

}
