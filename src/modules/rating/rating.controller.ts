import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRatingDto } from './dto/createRating.dto';
import { GetAllraintgDto } from './dto/getAllRating.dto';
import { UpdateRatingDto } from './dto/updateRating.dto';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get('all')
  getAll(query: GetAllraintgDto) {
    return this.ratingService.getAll(query);
  }

  @Get('one/:id')
  getOne(@Param('id') id: string) {
    return this.ratingService.getOne(id);
  }

  @Post('create')
  create(@Body() payload: CreateRatingDto) {
    return this.ratingService.create(payload);
  }

  @Put('update')
  update(@Body() payload: UpdateRatingDto) {
    return this.ratingService.update(payload);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.ratingService.delete(id);
  }
}
