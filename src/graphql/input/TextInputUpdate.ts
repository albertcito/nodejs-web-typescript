import { Field, InputType, Int } from 'type-graphql';

import TextInputBase from './TextInputCreate';

@InputType('TextInputUpdate')
export default class TextInputUpdate extends TextInputBase {
  @Field(() => Int, { nullable: true })
  translationID?: number;
}
