import {
  Field, ObjectType, Int, Float,
} from 'type-graphql';
import {
  Entity, PrimaryColumn, Column,
} from 'typeorm';

import BaseEntity from './BaseEntity';

@ObjectType()
@Entity({ name: 'email_update' })
export default class Email extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field(() => Int)
  @Column({ name: 'user_id' })
  userID: number;

  @Field(() => String)
  @Column()
  from: string;

  @Field(() => String, { nullable: true })
  @Column({ name: 'from_name' })
  fromName: string;

  @Field(() => String)
  @Column()
  subject: string;

  @Field(() => String)
  @Column()
  content: string;

  @Field(() => String, { nullable: true })
  @Column({ name: 'reply_to' })
  replyTo: string;

  @Field(() => Float)
  @Column({ name: 'sent_at' })
  sentAt: Date;
}
