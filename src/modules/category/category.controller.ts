import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsersRole } from 'src/common/types/EnumTypes';
import { Roles } from 'src/core/decorators/roles';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { v4 as uuidv4 } from 'uuid';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategoryDto';
import { GetAllCategoryDto } from './dto/getAllCategoryDto';
import { UpdateCategoryDto } from './dto/UpdateCategoryDto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get('all')
  @ApiOperation({ summary: 'Barcha kategoriyalar roʻyxatini olish' })
  getAll(@Query() query: GetAllCategoryDto) {
    return this.categoryService.getAll(query);
  }


  @Get('one/:id')
  @ApiOperation({ summary: 'Bitta kategoriyani olish' })
  getOne(@Param('id') id: string) {
    return this.categoryService.getOne(id);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.ADMIN, UsersRole.SUPERADMIN)
  @ApiBearerAuth()
  @Post('create')
  @ApiOperation({ summary: 'Yangi categoriya yaratish' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        img: { type: 'string', format: 'binary' },
        icon_img: { type: 'string', format: 'binary' },
      },
      required: ['name', 'img', 'icon_img'],
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'img', maxCount: 1 },
        { name: 'icon_img', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads/public',
          filename: (req, file, cb) => {
            const uniqueName = uuidv4() + extname(file.originalname);
            cb(null, uniqueName);
          },
        }),
        fileFilter: (req, file, cb) => {
          const imgTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/bmp',
            'image/svg+xml',
            'image/tiff',
            'image/x-icon',
          ];

          if (!imgTypes.includes(file.mimetype)) {
            return cb(
              new BadRequestException(
                'Faqatgina rasm fayllarga ruxsat beriladi!',
              ),
              false,
            );
          }

          cb(null, true);
        },
        limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
      },
    ),
  )
  async create(
    @Body() payload: CreateCategoryDto,
    @UploadedFiles()
    files: { img: Express.Multer.File[]; icon_img: Express.Multer.File[] },
  ) {
    const img = files.img?.[0]?.filename;
    const icon_img = files.icon_img?.[0]?.filename;

    return this.categoryService.create(payload, { img, icon_img });
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.ADMIN, UsersRole.SUPERADMIN)
  @Put('update')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Kategoriyani yangilash' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Kategoriya maʼlumotlarini yangilash',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        img: { type: 'string', format: 'binary' },
        icon_img: { type: 'string', format: 'binary' },
      },
      required: ['id'],
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'img', maxCount: 1 },
        { name: 'icon_img', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads/public',
          filename: (req, file, cb) => {
            const uniqueName = uuidv4() + extname(file.originalname);
            cb(null, uniqueName);
          },
        }),
        fileFilter: (req, file, cb) => {
          const imgTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/bmp',
            'image/svg+xml',
            'image/tiff',
            'image/x-icon',
          ];

          if (!imgTypes.includes(file.mimetype)) {
            return cb(
              new BadRequestException(
                'Faqatgina rasm fayllarga ruxsat beriladi!',
              ),
              false,
            );
          }

          cb(null, true);
        },
        limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
      },
    ),
  )
  async update(
    @Body() payload: UpdateCategoryDto,
    @UploadedFiles()
    files: { img?: Express.Multer.File[]; icon_img?: Express.Multer.File[] },
  ) {
    const img = files.img?.[0]?.filename;
    const icon_img = files.icon_img?.[0]?.filename;

    return this.categoryService.update({
      ...payload,
      ...(img && { img }),
      ...(icon_img && { icon_img }),
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.ADMIN, UsersRole.SUPERADMIN)
  @Delete('delete/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Kategoriya o‘chirish' })
  delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
