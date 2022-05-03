import * as path from 'path';
import { Env } from 'src/core/utils/env';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export function mailer(): object {
  return {
    transport: {
      host: Env.readString('MAILER_HOST', 'localhost'),
      port: Env.readInt('MAILER_PORT', 1025),
      ignoreTLS: true,
      secure: false,
      auth: {
        user: Env.readString('MAILER_USER', 'user'),
        pass: Env.readString('MAILER_PASS', 'password'),
      },
    },
    defaults: {
      from: {
        name: Env.readString('MAILER_FROM_NAME', 'from'),
        address: Env.readString('MAILER_FROM_ADDRESS', 'from@emailcom'),
      },
    },
    preview: Env.readString('MAILER_PREVIEW', false),
    template: {
      dir: path.resolve(__dirname + './../../templates/emails'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  };
}

console.log(path.resolve(__dirname + './../../templates/emails'));
