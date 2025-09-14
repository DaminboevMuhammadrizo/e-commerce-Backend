import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import type { Response } from 'express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @ApiOperation({ summary: 'Public faylni olish (static fayl)' })
  @Get('public/:name')
  getPublicFile(@Param('name') name: string, @Res() res: Response) {
    return this.fileService.getPublicFile(name, res);
  }
}
