import { Injectable, NotFoundException } from '@nestjs/common';
import { isId } from 'src/core/utils/isId';
import { PrismaService } from 'src/Database/prisma.service';
import { CreateRatingDto } from './dto/createRating.dto';
import { GetAllraintgDto } from './dto/getAllRating.dto';
import { UpdateRatingDto } from './dto/updateRating.dto';

@Injectable()
export class RatingService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(query: GetAllraintgDto) {
    const take = query.limit ?? 10;
    const skip = query.offset ? (query.offset - 1) * take : 0;
    const where: any = {};

    query.accommodation_id && (where.accommodation_id = query.accommodation_id);

    const data = await this.prisma.rating.findMany({ where });
    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Rating not found !',
      });
    }

    return {
      success: true,
      data,
    };
  }

  async getOne(id: string) {
    isId(id);
    const data = await this.prisma.rating.findUnique({
      where: { id: Number(id) },
    });

    if (!data) {
      throw new NotFoundException({
        success: false,
        message: 'Rating not found !',
      });
    }

    return {
      success: true,
      data,
    };
  }

  async create(payload: CreateRatingDto, user_id: number) {
    if (!(await this.prisma.user.findUnique({ where: { id: user_id } }))) {
      throw new NotFoundException({
        success: false,
        message: 'User not found !',
      });
    }

    await this.prisma.rating.create({ data: { ...payload, user_id } });
    return { success: true, message: 'Rating success created !' };
  }

  async update(payload: UpdateRatingDto) {
    if (!(await this.prisma.rating.findUnique({ where: { id: payload.id } }))) {
      throw new NotFoundException({
        success: false,
        message: 'Rating not found !',
      });
    }
  }

  async delete(id: string) {}
}
