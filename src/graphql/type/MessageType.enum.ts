/* eslint-disable no-unused-vars */
import { registerEnumType } from 'type-graphql';

// eslint-disable-next-line no-shadow
enum MessageType {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error'
}

registerEnumType(MessageType, {
  name: 'MessageType',
  description: 'All possible message types',
});

export default MessageType;
