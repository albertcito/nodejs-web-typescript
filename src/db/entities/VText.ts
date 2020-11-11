import { Field, Int, ObjectType } from 'type-graphql';
import {
  Column, Entity, PrimaryColumn,
} from 'typeorm';

import BaseEntity from './BaseEntity';

@ObjectType()
@Entity({ name: 'vtext' })
export default class VText extends BaseEntity {
  @Field(() => String)
  @Column()
  text: string;

  @Field(() => String)
  @PrimaryColumn({ name: 'lang_id' })
  langID: string;

  @Field(() => Int)
  @PrimaryColumn({ name: 'translation_id' })
  translationID: number;

  @Field(() => String, { description: 'Language name' })
  @Column()
  name: string;

  @Field(() => Boolean, { description: 'If the current text exist in this language' })
  @Column({ name: 'is_available' })
  isAvailable: boolean;

  @Field(() => String, { description: 'If the text does not exist it will be replaced by the text of this language' })
  @Column({ name: 'original_lang_id' })
  originalLangID: string;

  @Field(() => Boolean, { description: 'Lang table value' })
  @Column({ name: 'active' })
  active: boolean;

  @Field(() => Boolean, { description: 'Translation status' })
  @Column({ name: 'is_blocked' })
  isBlocked: boolean;

  @Field(() => String, { description: 'Translation code' })
  @Column()
  code: string;
}
