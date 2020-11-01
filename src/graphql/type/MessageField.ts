import { ObjectType, Field } from 'type-graphql';

@ObjectType()
class MessageField {
  @Field()
  type: 'success' | 'info' | 'warning' | 'error' = 'success';

  @Field(() => String)
  message: string;
}

export default MessageField;
