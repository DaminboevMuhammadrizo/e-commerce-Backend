import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { isId } from 'src/core/utils/isId';
import { GetAllConatctsDto } from './dto/GetAllContactsDto';
import { CreateContactDto } from './dto/createContact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(query: GetAllConatctsDto) {
    const take = query.limit ?? 10;
    const skip = query.offset ? (query.offset - 1) * take : 0;
    const where: any = {};

    query.date && (where.date = query.date);

    const data = await this.prisma.contact.findMany({ where });
    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Contact Not Found !',
      });
    }

    return {
      success: true,
      message: 'success readed !',
      data,
    };
  }

  async getOne(id: string) {
    isId(id);
    const data = await this.prisma.contact.findUnique({
      where: { id: Number(id) },
    });

    if (!data) {
      throw new NotFoundException({
        success: false,
        message: 'Contact Not Found !',
      });
    }

    return {
      success: true,
      message: 'success readed !',
      data,
    };
  }

  async create(payload: CreateContactDto) {
    await this.prisma.contact.create({ data: payload });
    return {
      success: true,
      message: 'Contact success sended !',
    };
  }
}
