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

  private readonly params?: ejsParams;

  constructor(view: string, params?: ejsParams) {
    this.view = view;
    this.params = params;
  }

  private getTransporter() {
    return nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      auth: {
        user: 'project.1',
        pass: 'secret.1',
      },
    });
  }

  async send(options: EmailOptions) {
    const transporter = this.getTransporter();
    const to = process.env.UNIVERSAL_TO ?? options.to;
    const from = options.from ?? `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`;
    const render = new Render(this.view);
    const html = await render.getHtml(this.params);
    const info = await transporter.sendMail({
      ...options, to, from, html,
    });

    console.log('Message sent: %s', info.messageId);
  }
}

export default Email;
