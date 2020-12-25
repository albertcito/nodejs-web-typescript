import { Field, ObjectType, Int } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import BaseEntity from './BaseEntity';
import userStatus from 'src/logic/userStatus/userStatus.enum';

@ObjectType()
@Entity({ name: 'user_status_reason' })
export default class UserStatusReason extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ name: 'user_id' })
  userID: number;

  @Field(() => userStatus)
  @Column({ name: 'user_status_id' })
  userStatusID: userStatus;

  @Field(() => String)
  @Column()
  reason: string;
}
