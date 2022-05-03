import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConnectionString } from 'connection-string';
import * as path from 'path';
import { Env } from 'src/core/utils/env';

export function database(): SequelizeModuleOptions {
  const dbDsn = new ConnectionString(Env.readString('DB_DSN'));

  return <SequelizeModuleOptions>{
    ...{
      dialect: dbDsn.protocol,
      host: dbDsn.hostname,
      port: dbDsn.port,
      username: dbDsn.user,
      password: dbDsn.password,
      database: dbDsn.path[0],
      models: [path.resolve(__dirname, '../../models')],
      autoLoadModels: true,
      synchronize: Env.readBoolish('DB_SYNC'),
    },
    ...(dbDsn.params || {}),
  };
}
