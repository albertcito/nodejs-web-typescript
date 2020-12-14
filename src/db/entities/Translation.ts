import {
  Arg, Field, Int, ObjectType,
} from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, getManager,
} from 'typeorm';

import BaseEntity from './BaseEntity';
import VText from './VText';

@ObjectType()
@Entity({ name: 'translation' })
export default class Translation extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  code: string;

  @Field(() => Boolean)
  @Column({ name: 'is_blocked' })
  isBlocked: boolean;

  @Field(() => [VText])
  async texts() {
    return getManager().find(VText, { where: { translationID: this.id } });
  }

  @Field(() => VText)
  async text(@Arg('langID', { defaultValue: 'EN' }) langID: string) {
    return getManager().findOne(VText, {
      where: {
        translationID: this.id,
        langID,
      },
    });
  }
}
