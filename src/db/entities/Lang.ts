import { Field, ObjectType } from 'type-graphql';
import {
  Entity, PrimaryColumn, Column,
} from 'typeorm';

import BaseEntity from './BaseEntity';

@ObjectType()
@Entity()
class Lang extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn({ name: 'lang_id' })
  langID: string;

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
}

export default Lang;
