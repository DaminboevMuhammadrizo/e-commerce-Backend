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
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CreateAccommidationDto } from '../accomodation/dto/createAccommidation.dto';
import { GetAllAccommidationDto } from '../accomodation/dto/getAllAccommidiation.dto';
import { UpdateAccommidationDto } from '../accomodation/dto/updateAccommidation.dto';
import { AccomodationService } from './accomodation.service';

@Controller('accomodation')
export class AccomodationController {
  constructor(private readonly accommidiationService: AccomodationService) {}

  @Get('all')
  getAll(@Query() query: GetAllAccommidationDto) {
    return this.accommidiationService.getAll(query);
  }

  @Get('one/:id')
  getOne(@Param('id') id: string) {
    return this.accommidiationService.getOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Yangi accommodation yaratish' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        // DTO oddiy maydonlari
        isActive: { type: 'boolean', example: true },
        title: { type: 'string', example: 'My accommodation' },
        beds: { type: 'integer', example: 3 },
        // ... boshqa DTO maydonlari
        price: { type: 'number', example: 1500 },
        build_year: { type: 'integer', example: 2020 },
        description: { type: 'string', example: 'Nice place' },
        latitude: { type: 'number', example: 41.123 },
        longitude: { type: 'number', example: 69.123 },
        country: { type: 'string', example: 'Uzbekistan' },

        // Fayl maydonlari
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
  @Post('create')
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
            let subFolder = '';

            switch (file.fieldname) {
              case 'img':
                subFolder = 'img';
                break;
              case 'introVideo':
                subFolder = 'video';
                break;
              case 'documents':
                subFolder = 'document';
                break;
              default:
                subFolder = '';
            }

            const uploadPath = `./uploads/accommodations/${subFolder}`;
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
  async createAccommodation(
    @UploadedFiles()
    files: {
      img?: Express.Multer.File[];
      introVideo?: Express.Multer.File[];
      documents?: Express.Multer.File[];
    },
    @Body() payload: CreateAccommidationDto,
  ) {
    const images = files.img?.map((file) => file.filename) ?? [];
    const introVideo = files.introVideo?.[0]?.filename ?? null;
    const documents = files.documents?.map((file) => file.filename) ?? [];

    return this.accommidiationService.create({
      ...payload,
      img: images,
      introVideo,
      documents,
    });
  }

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
        listing_type: { type: 'string', example: 'RENT' }, // enum value
        user_id: { type: 'integer', example: 1 },
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
            let subFolder = '';

            switch (file.fieldname) {
              case 'img':
                subFolder = 'img';
                break;
              case 'introVideo':
                subFolder = 'video';
                break;
              case 'documents':
                subFolder = 'document';
                break;
              default:
                subFolder = '';
            }

            const uploadPath = `./uploads/accommodations/${subFolder}`;
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
  ) {
    const images = files.img?.map((file) => file.filename);
    const introVideo = files.introVideo?.[0]?.filename;
    const documents = files.documents?.map((file) => file.filename);

    if (images) payload.img = images;
    if (introVideo) payload.introVideo = introVideo;
    if (documents) payload.documents = documents;

    return this.accommidiationService.update(payload);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.accommidiationService.delete(id);
  }
}
