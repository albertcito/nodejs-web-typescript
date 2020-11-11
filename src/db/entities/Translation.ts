import {
  Arg, Field, Int, ObjectType,
} from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';

import BaseEntity from './BaseEntity';
import VText from './VText';

@ObjectType()
@Entity({ name: 'translation' })
export default class Translation extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ name: 'translation_id' })
  translationID: number;

  @Field(() => String)
  @Column()
  code: string;

  @Field(() => Boolean)
  @Column({ name: 'is_blocked' })
  isBlocked: boolean;

  @Field(() => [VText])
  async texts() {
    return VText.find({ where: { translationID: this.translationID } });
  }

  @Field(() => VText)
  async text(@Arg('langID', { defaultValue: 'EN' }) langID: string) {
    return VText.findOne({
      where: {
        translationID: this.translationID,
        langID,
      },
    });
  }
}
