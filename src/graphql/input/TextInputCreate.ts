import { Field, InputType } from 'type-graphql';

@InputType('TextInputCreate')
export default class TextInputCreate {
  @Field(() => String)
  text: string;

  @Field(() => String)
  langID: string;
}
