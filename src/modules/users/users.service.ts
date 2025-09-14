import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async getAll(query: any) { }


  async getOne(id: string) { }


  async update(payload: any) { }


  async delete(id: string) { }
}
