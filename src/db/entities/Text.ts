import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';

import BaseEntity from './BaseEntity';

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
  @Column({ name: 'text_id' })
  langID: string;

  @Field(() => Int)
  @Column({ name: 'translation_id' })
  translationID: number;
}
