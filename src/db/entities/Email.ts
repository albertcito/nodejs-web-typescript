import {
  Field, ObjectType, Int, Float,
} from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, BeforeInsert,
} from 'typeorm';

import BaseEntity from './BaseEntity';

@ObjectType()
@Entity({ name: 'email' })
export default class Email extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'user_id' })
  userID?: number;

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
  replyTo?: string;

  @Field(() => String, { nullable: true })
  @Column({ name: 'reply_to_name' })
  replyToName?: string;

  @Field(() => Float)
  @Column({ name: 'sent_at' })
  sentAt: Date;

  @BeforeInsert()
  protected insertRow() {
    this.sentAt = new Date();
  }
}
