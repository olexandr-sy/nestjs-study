import { Env } from 'src/core/utils/env';

export function app() {
  return {
    version: Env.readString('APP_VERSION', 'v1'),
  };
}
