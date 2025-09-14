import { Injectable, NotFoundException } from '@nestjs/common';
import { isId } from 'src/core/utils/isId';
import { PrismaService } from 'src/Database/prisma.service';
import { CreateIdeaDto } from './dto/createIdea.dto';
import { GetAllIdeaDto } from './dto/getIdeadto';

@Injectable()
export class IdeaService {
  constructor(private readonly prisma: PrismaService) { }

  async getAll(query: GetAllIdeaDto) {
    const take = query.limit ?? 10;
    const skip = query.offset ? (query.offset - 1) * take : 0;
    const where: any = {};

    query.fullName && (where.fullName = { contains: query.fullName, mode: 'insensitive' })

    const data = await this.prisma.opinion.findMany({ where, take, skip })
    if (data.length === 0) {
      throw new NotFoundException({ success: false, message: 'Opinion not found !' })
    }

    return data
  }


  async create(payload: CreateIdeaDto) {
    await this.prisma.opinion.create({ data: payload })
    return { success: true, message: 'Opinion success sended !' }
  }


  async delete(id: string) {
    isId(id)
    const data = await this.prisma.opinion.findUnique({ where: { id: Number(id) } })

    if (!data) {
      throw new NotFoundException({ success: false, message: 'Opinion not found !' })
    }

    await this.prisma.opinion.delete({ where: { id: Number(id) } })
    return { success: true, message: 'Opinion success deleted !' }
  }
}
