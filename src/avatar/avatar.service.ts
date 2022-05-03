import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';

@Injectable()
export class AvatarService {
  constructor(private readonly minioClient: MinioService) {}

  async loadAvatar() {
    console.log(this.minioClient.client.listBuckets());
  }
}
