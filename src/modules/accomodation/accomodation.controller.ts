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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @ApiOperation({ summary: 'Yangi accommodation yaratish !' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Accommodation maʼlumotlari va intro video fayli',
    schema: {
      type: 'object',
      properties: {
        isActive: { type: 'boolean' },
        title: { type: 'string' },
        beds: { type: 'integer' },
        baths: { type: 'integer' },
        garage: { type: 'integer' },
        sq_ft: { type: 'integer' },
        price: { type: 'number' },
        discount: { type: 'number' },
        build_year: { type: 'string', format: 'date-time' },
        description: { type: 'string' },
        documents: { type: 'object' },
        map_url: { type: 'string' },
        latitude: { type: 'number' },
        longitude: { type: 'number' },
        country: { type: 'string' },
        extra_features: { type: 'object' },
        listing_type: { type: 'string', enum: ['RENT', 'SALE'] }, // enum qiymatlar
        user_id: { type: 'integer' },
        category_id: { type: 'integer' },
        introVideo: { type: 'string', format: 'binary' },
      },
      required: [
        'isActive',
        'title',
        'beds',
        'baths',
        'garage',
        'sq_ft',
        'price',
        'build_year',
        'description',
        'documents',
        'latitude',
        'longitude',
        'country',
        'extra_features',
        'listing_type',
        'user_id',
        'category_id',
      ],
    },
  })
  @Post('create')
  @UseInterceptors(
    FileInterceptor('introVideo', {
      storage: diskStorage({
        destination: './uploads/accommodations',
        filename: (req, file, cb) => {
          const uniqueName = uuidv4() + extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
      fileFilter: (req, file, cb) => {
        const videoTypes = [
          'video/mp4',
          'video/mpeg',
          'video/x-msvideo',
          'video/x-matroska',
          'video/webm',
          'video/3gpp',
          'video/3gpp2',
          'video/ogg',
          'video/quicktime',
          'video/x-flv',
          'video/x-ms-wmv',
        ];

        if (!videoTypes.includes(file.mimetype)) {
          return cb(
            new BadRequestException(
              'Intro video uchun yaroqsiz fayl turi yuklandi!',
            ),
            false,
          );
        }

        cb(null, true);
      },
      limits: {
        fileSize: 1000 * 1024 * 1024, // 1000MB
      },
    }),
  )
  createAccommodation(
    @UploadedFile() introVideo: Express.Multer.File,
    @Body() payload: CreateAccommidationDto,
  ) {
    return this.accommidiationService.create({
      ...payload,
      introVideo: introVideo.filename,
    });
  }

  @Put('update')
  update(@Body() payload: UpdateAccommidationDto) {
    return this.accommidiationService.update(payload);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.accommidiationService.delete(id);
  }
}
