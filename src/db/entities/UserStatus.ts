import {
  Field, ObjectType, Int, Arg,
} from 'type-graphql';
import {
  Entity, PrimaryColumn, Column,
} from 'typeorm';

import BaseEntity from './BaseEntity';
import VText from './VText';

import userStatus from '~src/logic/userStatus/userStatus.enum';

@ObjectType()
@Entity({ name: 'user_status' })
export default class UserStatus extends BaseEntity {
  @Field(() => userStatus)
  @PrimaryColumn()
  id: userStatus;

  @Field(() => Int)
  @Column({ name: 'name_id' })
  nameID: number;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'description_id' })
  descriptionID: number;

  @Field(() => Boolean)
  @Column()
  available: boolean;

  @Field(() => [VText])
  async names() {
    return VText.find({ where: { translationID: this.nameID } });
  }

  @Field(() => VText)
  async name(@Arg('langID', { defaultValue: 'EN' }) langID: string) {
    return VText.findOne({
      where: {
        translationID: this.nameID,
        langID,
      },
    });
  }

  @Field(() => [VText], { nullable: true })
  async descriptions() {
    return VText.find({ where: { translationID: this.descriptionID } });
  }

  @Field(() => VText, { nullable: true })
  async description(@Arg('langID', { defaultValue: 'EN' }) langID: string) {
    return VText.findOne({
      where: {
        translationID: this.descriptionID,
        langID,
      },
    });
  }
}
