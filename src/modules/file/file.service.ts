import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  async getPublicFile(name: string, res: Response) {
    const filePath = join(process.cwd(), 'uploads', 'public', name);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }

    // Fayl yuborish
    return res.sendFile(filePath, (err) => {
      if (err) {
        // Bu yerda 'throw' emas, chunki sendFile allaqachon stream ishlatyapti
        console.error('Error while sending file:', err);
        return res.status(500).json({
          success: false,
          message: 'Internal server error while sending file',
        });
      }
    });
  }
}

