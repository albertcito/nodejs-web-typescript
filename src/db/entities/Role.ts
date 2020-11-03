import { Field, ObjectType } from 'type-graphql';
import {
  Entity, PrimaryColumn, Column, ManyToMany,
} from 'typeorm';

import roles from '../../logic/role/role.enum';
import BaseEntity from './BaseEntity';
import User from './User';

@ObjectType()
@Entity({ name: 'role' })
export default class Role extends BaseEntity {
  @Field(() => roles)
  @PrimaryColumn({ name: 'role_id' })
  roleID: roles;

  @Field(() => String)
  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
