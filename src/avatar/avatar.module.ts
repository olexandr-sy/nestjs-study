import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MinioModule } from 'nestjs-minio-client';
import { AvatarService } from './avatar.service';

@Module({
  imports: [
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get('storage'),
    }),
  ],
  providers: [AvatarService],
  exports: [AvatarService],
})
export class AvatarModule {}
