import { ClassType, ObjectType, Field } from 'type-graphql';
import MessageField from './MessageField';

export default function MessageResponse<TItem>(TItemClass: ClassType<TItem>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => TItemClass)
    data: TItem;

    @Field(() => MessageField)
    messages: MessageField;
  }
  return PaginatedResponseClass;
}
