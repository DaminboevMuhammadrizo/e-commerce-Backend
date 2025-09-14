import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { CreateLikeDto } from './dto/createlikeDto';
import { LikesService } from './likes.service';

@ApiTags('Likes')
@ApiBearerAuth()
@Controller('likes')
export class LikesController {
  constructor(private readonly likeService: LikesService) { }

  @UseGuards(AuthGuard)
  @Post('upsert')
  @ApiOperation({ summary: 'Create or update like' })
  @ApiBody({ type: CreateLikeDto })
  @ApiResponse({ status: 201, description: 'Like created or updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() payload: CreateLikeDto, @Req() req: Request | any) {
    return this.likeService.create(req['user'].id, payload.accommodation_id, payload.like);
  }
}
