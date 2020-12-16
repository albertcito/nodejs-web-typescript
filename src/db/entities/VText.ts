import { Field, Int, ObjectType } from 'type-graphql';
import {
  ViewEntity, ViewColumn, BaseEntity,
} from 'typeorm';

@ObjectType()
@ViewEntity({ name: 'vtext' })
export default class VText extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  id: string;

  @Field(() => String)
  @ViewColumn()
  text: string;

  @Field(() => String)
  @ViewColumn({ name: 'lang_id' })
  langID: string;

  @Field(() => Int)
  @ViewColumn({ name: 'translation_id' })
  translationID: number;

  @Field(() => String, { description: 'Language name' })
  @ViewColumn()
  name: string;

  @Field(() => Boolean, { description: 'If the current text exist in this language' })
  @ViewColumn({ name: 'is_available' })
  isAvailable: boolean;

  @Field(() => String, { description: 'If the text does not exist it will be replaced by the text of this language' })
  @ViewColumn({ name: 'original_lang_id' })
  originalLangID: string;

  @Field(() => Boolean, { description: 'Lang table value' })
  @ViewColumn({ name: 'active' })
  active: boolean;

  @Field(() => Boolean, { description: 'Translation status' })
  @ViewColumn({ name: 'is_blocked' })
  isBlocked: boolean;

  @Field(() => String, { description: 'Translation code' })
  @ViewColumn()
  code: string;
}
