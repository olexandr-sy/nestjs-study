import { Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ExpressAdapter, FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('avatars')
export class AvatarController {
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async store(@UploadedFile() file) {
    console.log(file);
    return { test: 'test' };
  }
}
