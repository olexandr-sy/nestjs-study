import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import ResetPassword from 'models/reset.password.model';
import { NotificationModule } from 'src/notification/notification.module';
import { UserModule } from 'src/user/user.module';
import { ResetPasswordService } from './reset-password.service';

@Module({
  imports: [SequelizeModule.forFeature([ResetPassword]), NotificationModule, UserModule],
  providers: [ResetPasswordService],
  exports: [ResetPasswordService],
})
export class ResetPasswordModule {}
