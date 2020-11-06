/* eslint-disable camelcase */
import { Field, ObjectType, Int } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';

import BaseEntity from './BaseEntity';

@ObjectType()
@Entity({ name: 'user_role' })
export default class UserRole extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ name: 'user_role_id' })
  userRoleID: number;

  /**
   * If I change the column name as camelcase typeORM will print error
   */
  @Column({ name: 'role_id' })
  role_id: string;

  /**
   * If I change the column name as camelcase typeORM will print error
   */
  @Column({ name: 'user_id' })
  user_id: number;
}
