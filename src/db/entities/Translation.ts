import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn,
} from 'typeorm';

import BaseEntity from './BaseEntity';
import Text from './Text';

@ObjectType()
@Entity({ name: 'translation' })
export default class Translation extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ name: 'translation_id' })
  translationID: number;

  @Field(() => String)
  @Column()
  code: string;

  @Field(() => Boolean)
  @Column({ name: 'is_blocked' })
  isBlocked: boolean;

  @Field(() => [Text])
  @OneToMany(() => Text, (text) => text.translation, { eager: true })
  @JoinColumn({ name: 'translation_id' })
  texts: Text[];
}
