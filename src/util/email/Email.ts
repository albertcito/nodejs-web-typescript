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

  async send(options: EmailOptions, params?: ejsParams) {
    const transporter = this.getTransporter();
    const to = process.env.UNIVERSAL_TO ?? options.to;
    const from = options.from ?? `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`;
    const render = new Render(this.view);
    const html = await render.getHtml(params);
    transporter.sendMail({
      ...options, to, from, html,
    });
    // save send emails in DB and verify is the email was sent succefully
  }
}

export default Email;
