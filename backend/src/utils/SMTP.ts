import nodemailer from 'nodemailer';
import type { TransportOptions, SendMailOptions } from 'nodemailer';
import { google } from 'googleapis';
import type { Attachment } from 'nodemailer/lib/mailer/index.js';

export type SMTPOpts = {
  subject: string;
  body: string;
  attachments: Attachment[];
  to: string;
};

class SMTP {
  async createTransporter() {
    const {
      MAIL_ID: clientId,
      MAIL_SECRET: clientSecret,
      MAIL_REFRESH_TOKEN: refreshToken,
      MAIL_FROM: user,
    } = process.env;

    try {
      const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);

      oauth2Client.setCredentials({
        refresh_token: refreshToken || null,
      });

      const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(token);
        });
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user,
          accessToken,
          clientId,
          clientSecret,
          refreshToken,
        },
      } as TransportOptions);
      return transporter;
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }

  async sendMail({ body, subject, to, attachments = [] }: SMTPOpts) {
    const { MAIL_FROM } = process.env;

    try {
      const mailOptions: SendMailOptions = {
        from: MAIL_FROM,
        to,
        subject: subject,
        html: body,
        attachments,
      };

      let emailTransporter = await this.createTransporter();
      await emailTransporter.sendMail(mailOptions);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      console.log(err);
      return Promise.reject(err);
    }
  }
}

const instance = new SMTP();
export { instance as SMTP };
