import { Field, InputType } from 'type-graphql';

import TextInputBase from './TextInputCreate';

@InputType('TextInputUpdate')
export default class TextInputUpdate extends TextInputBase {
  @Field()
  textID?: number;
}
