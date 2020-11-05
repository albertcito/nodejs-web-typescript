import { ObjectType, Field } from 'type-graphql';
import MessageType from './MessageType.enum';

@ObjectType()
class MessageField {
  @Field(() => MessageType)
  type: MessageType;

  @Field(() => String)
  message: string;
}

export default MessageField;
