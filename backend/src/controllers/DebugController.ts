import { AppError } from '@error';
import type { DebugMailData } from '@types';
import { OTPTemplate } from '@templates';
import type { Attachment } from 'nodemailer/lib/mailer/index.js';
import { HttpCode, SMTP } from '@utils';
class DebugController {
  async sendMail(data: DebugMailData) {
    const email = {
      template: '',
      attachemnts: [] as Attachment[],
    };
    switch (data.template) {
      case 'otp':
        const { template, attachments } = OTPTemplate.buildOTP(
          data.value?.otp || '123456',
        );
        email.template = template;
        email.attachemnts = attachments;
        break;
      default:
        throw new AppError(
          `Invalid email template: ${data.template}`,
          HttpCode.BAD_REQUEST,
        );
    }
    await SMTP.sendMail({
      body: email.template,
      subject: 'Recuperação de Senha',
      to: data.email,
      attachments: email.attachemnts,
    });
  }
}

const instance = new DebugController();
export { instance as DebugController };
