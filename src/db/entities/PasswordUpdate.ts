import {
  Field, ObjectType, Int,
} from 'type-graphql';
import {
  Entity, PrimaryColumn, Column,
} from 'typeorm';

import BaseEntity from './BaseEntity';

@ObjectType()
@Entity({ name: 'password_update' })
export default class PasswordUpdate extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field(() => Int)
  @Column({ name: 'user_id' })
  userID: number;

  @Column({ name: 'password_old' })
  passwordOld: string;

  @Column({ name: 'password_new' })
  passwordNew: string;
}
