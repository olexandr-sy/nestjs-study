import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import configuration from 'src/config/configuration';
import { AuthModule } from 'src/auth/auth.module';
import { Env } from 'src/core/utils/env';
import { MailerModule } from '@nestjs-modules/mailer';
import { NotificationModule } from './notification/notification.module';
import { MinioModule } from 'nestjs-minio-client';
import { AvatarModule } from './avatar/avatar.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: [
        Env.readString('NODE_ENV', '') ? `.env.${Env.readString('NODE_ENV', '')}` : null,
        '.env',
        '.sample.env',
      ],
      expandVariables: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get<SequelizeModuleOptions>('database'),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: configService.get<object>('mailer.transport'),
        defaults: configService.get<object>('mailer.defaults'),
        preview: configService.get<boolean>('mailer.preview'),
        template: configService.get<object>('mailer.template'),
      }),
    }),
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get('storage'),
    }),
    AuthModule,
    NotificationModule,
    AvatarModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
