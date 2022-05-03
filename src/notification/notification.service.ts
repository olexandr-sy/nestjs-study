import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { FORGOT_PASSORD_TEMPLATE } from './notification.contstants';

@Injectable()
export class NotificationService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailTemplate(
    template: string,
    context: object,
    to: string,
    cc?: string[],
    bcc?: string[],
  ) {
    // Todo Add using queues
    this.mailerService
      .sendMail({
        to,
        cc,
        bcc,
        subject: await this.renderSebject(template),
        template: template,
        context: context,
      })
      .then(() => {
        console.log('[NotificationService] Message sent');
      })
      .catch((error) => {
        console.error('[NotificationService] Error: ' + error.message);
      });
  }

  async renderSebject(template: string) {
    switch (template) {
      case FORGOT_PASSORD_TEMPLATE:
        return 'Recovery password';
      default:
        console.error('[NotificationService] Subject not found');
    }
  }
}
