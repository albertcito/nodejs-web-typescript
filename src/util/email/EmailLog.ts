import { Address } from 'nodemailer/lib/mailer';

import EmailRecipient from '../../db/entities/EmailRecipient';
import Email from '../../db/entities/EmailLog';
import { EmailOptions as EmailBaseOptions } from './Email';
import EmailRecipientTypeEnum from './EmailRecipientType.enum';

interface EmailOptions extends Omit<EmailBaseOptions, 'from' | 'subject'> {
  html: string;
  from: Address;
  subject: string;
}

export default class EmailLog {
  async save(options: EmailOptions, userID?: number) {
    const email = await this.saveEmail(options, userID);
    await this.saveRecipients(email.id, options);
  }

  async saveEmail(options: EmailOptions, userID?: number) {
    const email = new Email();
    email.userID = userID;
    email.from = options.from.address;
    email.fromName = options.from.name;
    email.content = options.html;
    email.subject = options.subject;
    if (options.replyTo) {
      email.replyTo = options.replyTo.address;
      email.replyToName = options.replyTo.name;
    }
    return email.save();
  }

  async saveRecipients(emailID:number, options: EmailOptions) {
    const promises = [
      this.saveRecipientsType(emailID, EmailRecipientTypeEnum.to, options.to),
    ];
    if (options.cc) {
      promises.push(this.saveRecipientsType(emailID, EmailRecipientTypeEnum.cc, options.cc));
    }
    if (options.bcc) {
      promises.push(this.saveRecipientsType(emailID, EmailRecipientTypeEnum.bcc, options.bcc));
    }
    await Promise.all(promises);
  }

  async saveRecipientsType(
    emailID: number, type: EmailRecipientTypeEnum, addresses: Address | Address[],
  ) {
    if (Array.isArray(addresses)) {
      const promises: Promise<void>[] = [];
      addresses.forEach((address) => promises.push(this.saveRecipient(emailID, type, address)));
      Promise.all(promises);
    } else {
      await this.saveRecipient(emailID, type, addresses);
    }
  }

  async saveRecipient(emailID: number, type: EmailRecipientTypeEnum, recipient: Address) {
    const emailRecipient = new EmailRecipient();
    emailRecipient.name = recipient.name;
    emailRecipient.email = recipient.address;
    emailRecipient.type = type;
    emailRecipient.emailID = emailID;
    emailRecipient.save();
  }
}
