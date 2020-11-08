import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
} from 'typeorm';

import BaseEntity from './BaseEntity';
import Translation from './Translation';

@ObjectType()
@Entity({ name: 'text' })
export default class Text extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ name: 'text_id' })
  textID: number;

  @Field(() => String)
  @Column()
  text: string;

  @Field(() => String)
  @Column({ name: 'lang_id' })
  langID: string;

  @Field(() => Int)
  @Column({ name: 'translation_id' })
  translationID: number;

  @ManyToOne(() => Text, (text) => text.translation)
  @JoinColumn({ name: 'translation_id' })
  translation: Translation;
}
