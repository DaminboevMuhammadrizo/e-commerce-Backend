import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/createContact.dto';
import { GetAllConatctsDto } from './dto/GetAllContactsDto';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('all')
  @ApiOperation({ summary: 'Barcha contactlarni olish' })
  @ApiQuery({
    name: 'date',
    required: false,
    type: String,
    example: '2025-09-06',
  })
  @ApiQuery({
    name: 'email',
    required: false,
    type: String,
    example: 'ali@example.com',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    example: 'Ali Valiyev',
  })
  getAll(@Query() query: GetAllConatctsDto) {
    return this.contactService.getAll(query);
  }

  @Get('one/:id')
  @ApiOperation({ summary: 'Bitta contactni olish' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    required: true,
    description: 'Contact ID',
    example: 1,
  })
  getOne(@Param('id', ParseIntPipe) id: string) {
    return this.contactService.getOne(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Yangi contact yaratish' })
  @ApiBody({ type: CreateContactDto })
  create(@Body() payload: CreateContactDto) {
    return this.contactService.create(payload);
  }
}
