import nodemailer, { SendMailOptions } from 'nodemailer';

import Render from '../template/Render';

interface Address {
  name: string;
  address: string;
}

interface EmailOptions extends Omit<SendMailOptions, 'html' | 'to'> {
  to: string | Address | Array<string | Address>;
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
    const to = process.env.UNIVERSAL_TO ?? options.to;
    const from = options.from ?? `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`;
    const render = new Render(this.view);
    const html = await render.getHtml(params);

    if (process.env.NODE_ENV !== 'test') {
      await transporter.sendMail({
        ...options, to, from, html,
      });
    }
  }
}

export default Email;
