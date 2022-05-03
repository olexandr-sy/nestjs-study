import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import ResetPassword from 'models/reset.password.model';
import User from 'models/user.model';
import { RESET_PASSWORD_EXPIRED_MINUTES } from 'src/auth/auth.constants';
import { FORGOT_PASSORD_TEMPLATE } from 'src/notification/notification.contstants';
import { NotificationService } from 'src/notification/notification.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ResetPasswordService {
  constructor(
    @InjectModel(ResetPassword) private readonly resetPasswordModel: typeof ResetPassword,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
  ) {}

  async sendResetPasswordCode(email: string): Promise<void> {
    const user = await this.userService.find({ email });
    if (!user) {
      return;
    }

    const resetPassword = await this.createCode(user.email);
    if (!resetPassword) {
      throw new InternalServerErrorException();
    }

    await this.notificationService.sendEmailTemplate(
      FORGOT_PASSORD_TEMPLATE,
      {
        code: resetPassword.code,
        expired: RESET_PASSWORD_EXPIRED_MINUTES,
      },
      user.email,
    );
  }

  async resetPassword(code: string, password: string): Promise<User | null> {
    const resetPassword = await this.resetPasswordModel.findOne<ResetPassword>({
      where: {
        code,
      },
    });
    if (
      !resetPassword ||
      (resetPassword.createdAt &&
        this.getCodeLifetimeInMinutes(resetPassword.createdAt) > RESET_PASSWORD_EXPIRED_MINUTES)
    ) {
      return null;
    }

    const user = await this.userService.find({ email: resetPassword.email });
    if (user) {
      await this.userService.update(user, { password });
    }
    return user;
  }

  protected getCodeLifetimeInMinutes(createdAt: Date): number {
    return (new Date().getTime() - createdAt.getTime()) / 60000;
  }

  protected async createCode(email: string): Promise<ResetPassword | null> {
    const code = String(this.randomIntBetween(10000000, 99999999));
    return this.resetPasswordModel.create({
      email,
      code,
    });
  }

  protected randomIntBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
