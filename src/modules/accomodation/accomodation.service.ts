import { Injectable, NotFoundException } from '@nestjs/common';
import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { isId } from 'src/core/utils/isId';
import { PrismaService } from 'src/Database/prisma.service';
import { CreateAccommidationDto } from '../accomodation/dto/createAccommidation.dto';
import { GetAllAccommidationDto } from '../accomodation/dto/getAllAccommidiation.dto';
import { UpdateAccommidationDto } from '../accomodation/dto/updateAccommidation.dto';
import { GetTopAccomidationDto } from './dto/GetTopAccomidation';

@Injectable()
export class AccomodationService {
  constructor(private readonly prisma: PrismaService) { }

  async getAll(query: GetAllAccommidationDto) {
    const take = query.limit ?? 10;
    const skip = query.offset ? (query.offset - 1) * take : 0;
    const where: any = {};

    if (query.country) {
      where.country = { contains: query.country, mode: 'insensitive' };
    }
    if (query.title) {
      where.title = { contains: query.title, mode: 'insensitive' };
    }
    if (query.price !== undefined) {
      where.price = query.price;
    }

    const data = await this.prisma.accomodation.findMany({
      where,
      take,
      skip,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            avatar: true,
            createdAt: true,
          },
        },
        _count: {
          select: { likes: true },
        },
      },
      orderBy: {
        likes: {
          _count: 'desc',
        },
      },
    });

    return { success: true, message: 'success', data }
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


  async getTop(query: GetTopAccomidationDto) {
    const take = query.limit ?? 10;
    const skip = query.offset ? (query.offset - 1) * take : 0;

    const where: any = {};

    // Filtering
    if (query.title) {
      where.title = { contains: query.title, mode: 'insensitive' };
    }

    if (query.minPrice != null && query.maxPrice != null) {
      where.price = {
        gte: query.minPrice,
        lte: query.maxPrice
      };
    }

    if (query.listing_type) {
      where.listing_type = query.listing_type
    }


    const data = await this.prisma.accomodation.findMany({
      where,
      take,
      skip,
      include: {
        _count: {
          select: { likes: true }
        }
      },
      orderBy: {
        likes: {
          _count: 'desc'
        }
      }
    });



    if (data.length === 0) {
      throw new NotFoundException({ success: false, message: 'Accommodation Not Found!' });
    }

    return {
      success: true,
      data
    };
  }


  async getForHero() {
    const data = await this.prisma.accomodation.findMany({
      take: 3,
      orderBy: {
        likes: {
          _count: 'desc',
        },
      },
      select: {
        img: true,
        title: true,
        country: true,
        street: true,
        beds: true,
        baths: true,
        sq_ft: true,
        garage: true,
      },
    });

    const result = data.map(item => ({
      ...item,
      img: Array.isArray(item.img) && item.img.length > 0 ? item.img[0] : null,
    }));

    if (result.length === 0) {
      throw new NotFoundException({ success: false, message: 'Accommidation not found !' })
    }

    return { success: true, data: result }
  }



  async create(payload: CreateAccommidationDto, user_id: number) {

    const category = await this.prisma.category.findUnique({ where: { id: payload.category_id } })
    if (!category) {
      throw new NotFoundException({ success: false, message: 'Category not found !' })
    }

    const user = await this.prisma.user.findUnique({ where: { id: user_id } })
    if (!user) {
      throw new NotFoundException({ success: false, message: 'User ot Found !' })
    }
    await this.prisma.accomodation.create({
      data: {
        ...payload,
        user_id,
        img: payload.img ?? [],
        documents: payload.documents ?? [],
        introVideo: payload.introVideo ?? null,
      },
    });

    return { success: true, meesage: 'accommodation success created !' };
  }


  async update(payload: UpdateAccommidationDto, user_id: number) {
    const data = await this.prisma.accomodation.findUnique({
      where: { id: payload.id, user_id },
    });

    if (!data) {
      throw new NotFoundException({
        success: false,
        message: 'Accommodation not found!',
      });
    }

    // Agar yangi introVideo bo'lsa va eski introVideo mavjud bo'lsa, eski faylni o'chiramiz
    if (payload.introVideo && data.introVideo) {
      const oldVideoPath = join(
        process.cwd(),
        'uploads',
        'accommodations',
        'video',
        data.introVideo,
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
