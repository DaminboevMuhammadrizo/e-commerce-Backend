import { Injectable, NotFoundException } from '@nestjs/common';
import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { isId } from 'src/core/utils/isId';
import { PrismaService } from 'src/Database/prisma.service';
import { CreateAccommidationDto } from '../accomodation/dto/createAccommidation.dto';
import { GetAllAccommidationDto } from '../accomodation/dto/getAllAccommidiation.dto';
import { UpdateAccommidationDto } from '../accomodation/dto/updateAccommidation.dto';

@Injectable()
export class AccomodationService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(query: GetAllAccommidationDto) {
    const take = query.limit ?? 10;
    const skip = query.offset ? (query.offset - 1) * take : 0;
    const where: any = {};

    query.build_year && (where.build_year = query.build_year);
    query.country &&
      (where.country = { contains: query.country, mode: 'insensitive' });
    query.title &&
      (where.title = { contains: query.title, mode: 'insensitive' });
    query.price = where.price = query.price;

    const data = await this.prisma.accomodation.findMany({ where });

    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Accommidation not found !',
      });
    }

    return { success: true, message: 'success readed !', data };
  }

  async getOne(id: string) {
    isId(id);
    const data = await this.prisma.accomodation.findUnique({
      where: { id: Number(id) },
    });

    if (!data) {
      throw new NotFoundException({
        success: false,
        message: 'Accomidation not found !',
      });
    }

    return {
      success: true,
      message: 'success readed !',
      data,
    };
  }

  async create(payload: CreateAccommidationDto) {
    await this.prisma.accomodation.create({
      data: {
        ...payload,
        img: payload.img ?? [],
        documents: payload.documents ?? [],
        introeVideo: payload.introVideo ?? null,
      },
    });

    return { success: true, meesage: 'accommodation success created !' };
  }
  async update(payload: UpdateAccommidationDto) {
    const data = await this.prisma.accomodation.findUnique({
      where: { id: payload.id },
    });

    if (!data) {
      throw new NotFoundException({
        success: false,
        message: 'Accommodation not found!',
      });
    }

    // Agar yangi introVideo bo'lsa va eski introVideo mavjud bo'lsa, eski faylni o'chiramiz
    if (payload.introVideo && data.introeVideo) {
      const oldVideoPath = join(
        process.cwd(),
        'uploads',
        'accommodations',
        'video',
        data.introeVideo,
      );

      try {
        await fsPromises.access(oldVideoPath);
        await fsPromises.unlink(oldVideoPath);
        console.log('Old intro video deleted:', oldVideoPath);
      } catch (err) {
        console.warn('Old intro video could not be deleted:', err.message);
      }
    }

    await this.prisma.accomodation.update({
      where: { id: payload.id },
      data: payload,
    });

    return {
      success: true,
      message: 'Accommodation successfully updated!',
    };
  }

  async delete(id: string) {
    isId(id);
    if (
      !(await this.prisma.accomodation.findUnique({
        where: { id: Number(id) },
      }))
    ) {
      throw new NotFoundException({
        success: false,
        message: 'Accommidation not found !',
      });
    }

    await this.prisma.accomodation.delete({ where: { id: Number(id) } });
  }
}
