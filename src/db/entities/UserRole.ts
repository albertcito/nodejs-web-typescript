import { Field, ObjectType, Int } from 'type-graphql';
import {
  Entity, PrimaryColumn, Column,
} from 'typeorm';
import roles from '../../logic/role/role.enum';
import BaseEntity from './BaseEntity';

@ObjectType()
@Entity({ name: 'user_role' })
export default class UserRole extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn({ name: 'user_role_id' })
  userRoleID: number;

  @Field(() => roles)
  @Column({ name: 'role_id' })
  roleID: roles;

  @Field(() => Int)
  @Column({ name: 'user_id' })
  userID: number;
}
