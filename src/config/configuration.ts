import { Env } from 'src/core/utils/env';
import { database } from 'src/config/database';
import { server } from 'src/config/server';
import { app } from 'src/config/app';
import { auth } from 'src/config/auth';
import { mailer } from 'src/config/mailer';
import { storage } from 'src/config/storage';

export default () => {
  Env.init();

  const config: any = {};
  const configParts = {
    app,
    auth,
    database,
    server,
    mailer,
    storage,
  };

  for (const key in configParts) {
    config[key] = configParts[key](config);
  }

  return config;
};
