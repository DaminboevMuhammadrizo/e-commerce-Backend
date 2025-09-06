import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isId } from 'src/core/utils/isId';
import { PrismaService } from 'src/Database/prisma.service';
import { CreateCategoryDto } from './dto/createCategoryDto';
import { GetAllCategoryDto } from './dto/getAllCategoryDto';
import { UpdateCategoryDto } from './dto/UpdateCategoryDto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(query: GetAllCategoryDto) {
    const take = query.limit ?? 10;
    const skip = query.offset ? (query.offset - 1) * take : 0;
    const where: any = {};

    query.name && (where.name = { contains: query.name, mode: 'insensitive' });

    const data = await this.prisma.category.findMany({ where, skip, take });

    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Category not found !',
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
    const data = await this.prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!data)
      throw new NotFoundException({
        success: false,
        message: 'Category not Found !',
      });

    return {
      success: true,
      messgae: 'Suceess readed !',
      data,
    };
  }

  async create(
    payload: CreateCategoryDto,
    imgs: { img: string; icon_img: string },
  ) {
    const categoriy = await this.prisma.category.findUnique({
      where: { name: payload.name },
    });

    if (categoriy) {
      throw new ConflictException({
        success: false,
        message: 'category alredy exsists !',
      });
    }

    await this.prisma.category.create({ data: { ...payload, ...imgs } });
    return {
      success: true,
      message: 'Category success created !',
    };
  }

  async update(payload: UpdateCategoryDto) {
    const categoriy = await this.prisma.category.findUnique({
      where: { id: payload.id },
    });

    if (!categoriy) {
      throw new NotFoundException({
        success: false,
        message: 'category not found !',
      });
    }

    if (
      payload.name &&
      (await this.prisma.category.findUnique({ where: { name: payload.name } }))
    ) {
      throw new ConflictException({
        success: false,
        message: 'category alredy exsists !',
      });
    }

    await this.prisma.category.update({
      where: { id: payload.id },
      data: payload,
    });

    return {
      success: true,
      message: 'category success updated !',
    };
  }

  async delete(id: string) {
    isId(id);
    const categoriy = await this.prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!categoriy) {
      throw new NotFoundException({
        success: false,
        message: 'category not found !',
      });
    }

    await this.prisma.category.delete({ where: { id: Number(id) } });
    return { success: true, message: 'Category success deleted !' };
  }
}
