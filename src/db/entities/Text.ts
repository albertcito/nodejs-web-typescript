import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity, Column, PrimaryColumn,
} from 'typeorm';

import BaseEntity from './BaseEntity';

@ObjectType()
@Entity({ name: 'text', schema: 'lang' })
export default class Text extends BaseEntity {
  @Field(() => String)
  @Column()
  text: string;

  @Field(() => String)
  @PrimaryColumn({ name: 'lang_id' })
  langID: string;

  @Field(() => Int)
  @PrimaryColumn({ name: 'translation_id' })
  translationID: number;
}
