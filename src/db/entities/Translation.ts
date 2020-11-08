import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';

import BaseEntity from './BaseEntity';

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
}
