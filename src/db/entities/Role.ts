import { Field, ObjectType } from 'type-graphql';
import {
  Entity, PrimaryColumn, Column,
} from 'typeorm';

import BaseEntity from './BaseEntity';

import roles from '~src/logic/role/role.enum';

@ObjectType()
@Entity({ name: 'role' })
export default class Role extends BaseEntity {
  @Field(() => roles)
  @PrimaryColumn({ name: 'role_id' })
  roleID: roles;

  @Field(() => String)
  @Column()
  description: string;
}
