import { Field, InputType } from 'type-graphql';

import TextInputCreate from './TextInputCreate';

@InputType('TextInputCreate')
export default class TextInputUpdate extends TextInputCreate {
  @Field()
  textID?: number;
}
