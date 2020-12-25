import {
  Field, ObjectType, Int,
} from 'type-graphql';
import {
  Entity, PrimaryColumn, Column,
} from 'typeorm';

import BaseEntity from './BaseEntity';

@ObjectType()
@Entity({ name: 'email_update' })
export default class EmailUpdate extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field(() => Int)
  @Column({ name: 'user_id' })
  userID: number;

  @Field(() => String)
  @Column({ name: 'email_old' })
  emailOld: string;

  @Field(() => String)
  @Column({ name: 'email_new' })
  emailNew: string;
}
