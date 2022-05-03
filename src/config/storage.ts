import { Env } from 'src/core/utils/env';

export function storage() {
  return {
    endPoint: Env.readString('STORAGE_ENDPOINT', '127.0.0.1'),
    port: Env.readInt('STORAGE_PORT', 9000),
    useSSL: Env.readBool('STORAGE_SSL', false),
    accessKey: Env.readString('STORAGE_ACCESS_KEY', 'minioadmin'),
    secretKey: Env.readString('STORAGE_SECRET_KEY', 'minioadmin'),
  };
}
