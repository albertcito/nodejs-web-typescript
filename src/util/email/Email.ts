import nodemailer, { SendMailOptions } from 'nodemailer';

import Render from '../template/Render';
import EmailLog from './EmailLog';

interface Address {
  name: string;
  address: string;
}

export interface EmailOptions extends Omit<
  SendMailOptions, 'html' | 'to'| 'cc' | 'bcc' | 'from' | 'subject' | 'replyTo'
> {
  subject: string;
  from?: Address;
  to: Address | Address[];
  cc?: Address | Address[];
  bcc?: Address | Address[];
  replyTo?: Address;
}
type ejsParams = { [key: string]: any };

class Email {
  private readonly view: string;

  constructor(view: string) {
    this.view = view;
  }

  private async getTransporter() {
    const host = process.env.MAIL_HOST ?? 'localhost';
    const port = Number(process.env.MAIL_PORT) ?? 1025;
    const transport = {
      host,
      port,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    };
    return nodemailer.createTransport(transport);
  }

  async send(options: EmailOptions, params?: ejsParams) {
    const transporter = await this.getTransporter();
    const to = this.getTo(options.to);
    const from = options.from ?? {
      name: process.env.MAIL_FROM_NAME as string,
      address: process.env.MAIL_FROM_ADDRESS as string,
    };
    const render = new Render(this.view);
    const html = await render.getHtml(params);

    /* if (process.env.NODE_ENV !== 'test') {

    } */
    const newOptions = {
      ...options, to, from, html,
    };
    await transporter.sendMail(newOptions);
    (new EmailLog()).save(newOptions);
  }

  private getTo(to: Address | Address[]) {
    if (process.env.UNIVERSAL_TO) {
      return {
        name: 'Universal To',
        address: process.env.UNIVERSAL_TO,
      };
    }
    return to;
  }
}

export default Email;
