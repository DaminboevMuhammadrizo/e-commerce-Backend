import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRatingDto } from './dto/createRating.dto';
import { GetAllraintgDto } from './dto/getAllRating.dto';
import { UpdateRatingDto } from './dto/updateRating.dto';
import { RatingService } from './rating.service';

@ApiTags('Rating')
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) { }

  @Get('all')
  @ApiOperation({ summary: 'Get all ratings' })
  @ApiResponse({ status: 200, description: 'List of ratings' })
  getAll(@Query() query: GetAllraintgDto) {
    return this.ratingService.getAll(query);
  }

  @Get('one/:id')
  @ApiOperation({ summary: 'Get rating by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Rating ID' })
  @ApiResponse({ status: 200, description: 'Single rating object' })
  getOne(@Param('id') id: string) {
    return this.ratingService.getOne(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create new rating' })
  @ApiBody({ type: CreateRatingDto })
  @ApiResponse({ status: 201, description: 'Rating created successfully' })
  create(@Body() payload: CreateRatingDto) {
    return this.ratingService.create(payload, 1);
  }

  @Put('update')
  @ApiOperation({ summary: 'Update existing rating' })
  @ApiBody({ type: UpdateRatingDto })
  @ApiResponse({ status: 200, description: 'Rating updated successfully' })
  update(@Body() payload: UpdateRatingDto) {
    return this.ratingService.update(payload);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete rating by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Rating ID' })
  @ApiResponse({ status: 200, description: 'Rating deleted successfully' })
  delete(@Param('id') id: string) {
    return this.ratingService.delete(id);
  }
}
