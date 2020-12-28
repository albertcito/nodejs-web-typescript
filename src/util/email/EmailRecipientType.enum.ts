import { registerEnumType } from 'type-graphql';

enum EmailRecipientTypeEnum {
  to='to',
  cc='cc',
  bcc='bcc',
}

registerEnumType(EmailRecipientTypeEnum, {
  name: 'EmailRecipientTypeEnum',
  description: 'Email recipients',
});

export default EmailRecipientTypeEnum;
