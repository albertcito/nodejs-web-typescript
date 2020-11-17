import { Field, ObjectType } from 'type-graphql';
import {
  Entity, PrimaryColumn, Column, BeforeInsert,
} from 'typeorm';

import BaseEntity from './BaseEntity';

@ObjectType()
@Entity({ name: 'lang' })
class Lang extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn()
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  localname: string;

  @Field(() => Boolean)
  @Column()
  active: boolean;

  @Field(() => Boolean)
  @Column({ name: 'is_blocked' })
  isBlocked: boolean;

  @BeforeInsert()
  async insertRow() {
    this.isBlocked = !!this.isBlocked;
    this.active = !!this.active;
  }
}

export default Lang;
