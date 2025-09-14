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
  Req,
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
} from '@nestjs/swagger';
import { Request } from 'express';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';
import { extname } from 'path';
import { UsersRole } from 'src/common/types/EnumTypes';
import { Roles } from 'src/core/decorators/roles';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { v4 as uuidv4 } from 'uuid';
import { GetAllAccommidationDto } from '../accomodation/dto/getAllAccommidiation.dto';
import { UpdateAccommidationDto } from '../accomodation/dto/updateAccommidation.dto';
import { AccomodationService } from './accomodation.service';
import { CreateAccommidationDto } from './dto/createAccommidation.dto';
import { GetTopAccomidationDto } from './dto/GetTopAccomidation';

@Controller('accomodation')
export class AccomodationController {
  constructor(private readonly accommidiationService: AccomodationService) { }

  @Get('all')
  getAll(@Query() query: GetAllAccommidationDto) {
    return this.accommidiationService.getAll(query);
  }

  @Get('one/:id')
  getOne(@Param('id') id: string) {
    return this.accommidiationService.getOne(id);
  }


  @Get('top')
  getTop(@Query() query: GetTopAccomidationDto) {
    return this.accommidiationService.getTop(query)
  }

  @Get('hero')
  getForHero() {
    return this.accommidiationService.getForHero()
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.SELLER, UsersRole.ADMIN, UsersRole.SUPERADMIN)
  @Post('create')
  @ApiOperation({ summary: 'Yangi accommodation yaratish (file upload bilan)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        isActive: { type: 'boolean', example: true },
        title: { type: 'string', example: 'Luxury Apartment' },
        beds: { type: 'integer', example: 3 },
        baths: { type: 'integer', example: 2 },
        garage: { type: 'integer', example: 1 },
        sq_ft: { type: 'integer', example: 1500 },
        price: { type: 'number', example: 250000 },
        discount: { type: 'number', example: 15000 },
        build_year: { type: 'integer', example: 2021 },
        description: { type: 'string', example: 'Sea view villa' },
        latitude: { type: 'number', example: 40.7128 },
        longitude: { type: 'number', example: -74.006 },
        country: { type: 'string', example: 'USA' },
        street: { type: 'string', example: 'Mustaqillik ko‘chasi 473' },
        extra_features: {
          type: 'array',
          items: { type: 'string' },
          example: ['WiFi', 'Pool'],
        },
        listing_type: {
          type: 'string',
          enum: ['ForSale', 'ForRent'],
          example: 'ForSale',
        },
        category_id: { type: 'integer', example: 2 },
        img: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
        introVideo: { type: 'string', format: 'binary' },
        documents: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'img', maxCount: 20 },
        { name: 'introVideo', maxCount: 1 },
        { name: 'documents', maxCount: 20 },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {

            const uploadPath = path.join(
              process.cwd(),
              'uploads',
              'public',
            );

            if (!fs.existsSync(uploadPath)) {
              fs.mkdirSync(uploadPath, { recursive: true });
            }

            cb(null, uploadPath);
          },

          filename: (req, file, cb) => {
            const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
            cb(null, uniqueName);
          },
        }),

        fileFilter: (req, file, cb) => {
          // Rasm
          if (file.fieldname === 'img' && !file.mimetype.startsWith('image/')) {
            return cb(
              new BadRequestException('Faqat rasm fayllar yuklash mumkin!'),
              false,
            );
          }

          // Video
          if (
            file.fieldname === 'introVideo' &&
            ![
              'video/mp4',
              'video/mpeg',
              'video/webm',
              'video/x-matroska',
              'video/3gpp',
              'video/quicktime',
              'video/x-msvideo',
              'video/avi',
              'video/vnd.avi',
            ].includes(file.mimetype)
          ) {
            return cb(
              new BadRequestException('Intro video uchun noto‘g‘ri format!'),
              false,
            );
          }

          cb(null, true);
        },

        limits: {
          fileSize: 500 * 1024 * 1024,
        },
      },
    ),
  )
  async createAccommodation(
    @UploadedFiles()
    files: {
      img?: Express.Multer.File[];
      introVideo?: Express.Multer.File[];
      documents?: Express.Multer.File[];
    },
    @Body() payload: CreateAccommidationDto,
    @Req() req: Request | any
  ) {
    const images = files.img?.map((file) => file.filename) ?? [];
    const introVideo = files.introVideo?.[0]?.filename ?? null;
    const documents = files.documents?.map((file) => file.filename) ?? [];

    return this.accommidiationService.create({
      ...payload,
      img: images,
      introVideo,
      documents,
    }, req['user'].id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.SELLER, UsersRole.ADMIN, UsersRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Accommodation yangilash' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },

        isActive: { type: 'boolean', example: true },
        title: { type: 'string', example: 'My updated accommodation' },
        beds: { type: 'integer', example: 4 },
        baths: { type: 'integer', example: 2 },
        garage: { type: 'integer', example: 1 },
        sq_ft: { type: 'integer', example: 1300 },
        price: { type: 'number', example: 1700 },
        discount: { type: 'number', example: 150 },
        build_year: { type: 'integer', example: 2021 },
        description: { type: 'string', example: 'Updated description' },
        latitude: { type: 'number', example: 41.123 },
        longitude: { type: 'number', example: 69.123 },
        country: { type: 'string', example: 'Uzbekistan' },
        map_url: { type: 'string', example: 'https://maps.example.com' },
        listing_type: { type: 'string', example: 'RENT' },
        category_id: { type: 'integer', example: 5 },

        // Fayl maydonlari optional
        img: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
        introVideo: { type: 'string', format: 'binary' },
        documents: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
      required: ['id'], // faqat id majburiy
    },
  })
  @Put('update')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'img', maxCount: 20 },
        { name: 'introVideo', maxCount: 1 },
        { name: 'documents', maxCount: 20 },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {


            const uploadPath = `./uploads/public/`;
            cb(null, uploadPath);
          },
          filename: (req, file, cb) => {
            const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
            cb(null, uniqueName);
          },
        }),

        fileFilter: (req, file, cb) => {
          if (file.fieldname === 'img' && !file.mimetype.startsWith('image/')) {
            return cb(
              new BadRequestException('Faqat rasm fayllar yuklash mumkin!'),
              false,
            );
          }

          if (
            file.fieldname === 'introVideo' &&
            ![
              'video/mp4',
              'video/mpeg',
              'video/webm',
              'video/x-matroska',
              'video/3gpp',
              'video/quicktime',
            ].includes(file.mimetype)
          ) {
            return cb(
              new BadRequestException('Intro video uchun noto‘g‘ri format!'),
              false,
            );
          }

          // documents uchun har qanday faylga ruxsat
          cb(null, true);
        },

        limits: {
          fileSize: 100 * 1024 * 1024, // 100MB per file
        },
      },
    ),
  )
  async updateAccommodation(
    @UploadedFiles()
    files: {
      img?: Express.Multer.File[];
      introVideo?: Express.Multer.File[];
      documents?: Express.Multer.File[];
    },
    @Body() payload: UpdateAccommidationDto,
    @Req() req: Request | any
  ) {
    const images = files.img?.map((file) => file.filename);
    const introVideo = files.introVideo?.[0]?.filename;
    const documents = files.documents?.map((file) => file.filename);

    if (images) payload.img = images;
    if (introVideo) payload.introVideo = introVideo;
    if (documents) payload.documents = documents;

    return this.accommidiationService.update(payload, req['user'].id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.SELLER, UsersRole.ADMIN, UsersRole.SUPERADMIN)
  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.accommidiationService.delete(id);
  }
}
