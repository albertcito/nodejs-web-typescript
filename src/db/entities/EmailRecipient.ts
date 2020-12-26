import {
  Field, ObjectType, Int,
} from 'type-graphql';
import {
  Entity, PrimaryColumn, Column,
} from 'typeorm';

import BaseEntity from './BaseEntity';

@ObjectType()
@Entity({ name: 'email_recipient' })
export default class EmailRecipient extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field(() => Int)
  @Column({ name: 'email_id' })
  emailID: number;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  type: string;
}
