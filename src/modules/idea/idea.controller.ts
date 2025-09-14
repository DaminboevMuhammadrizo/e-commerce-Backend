import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateIdeaDto } from './dto/createIdea.dto';
import { GetAllIdeaDto } from './dto/getIdeadto';
import { IdeaService } from './idea.service';

@ApiTags('Opion')
@Controller('idea')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) { }

  @Get('all')
  @ApiOperation({ summary: 'Get all ideas' })
  @ApiResponse({ status: 200, description: 'List of ideas' })
  getAll(@Query() query: GetAllIdeaDto) {
    return this.ideaService.getAll(query);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new idea' })
  @ApiResponse({ status: 201, description: 'Idea created successfully' })
  @ApiBody({ type: CreateIdeaDto })
  create(@Body() payload: CreateIdeaDto) {
    return this.ideaService.create(payload);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete an idea by ID' })
  @ApiResponse({ status: 200, description: 'Idea deleted successfully' })
  @ApiParam({ name: 'id', type: String, example: '123' })
  delete(@Param('id') id: string) {
    return this.ideaService.delete(id);
  }
}
