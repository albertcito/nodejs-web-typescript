import {
  Field, ObjectType, Int, Arg,
} from 'type-graphql';
import {
  Entity, PrimaryColumn, Column, getManager,
} from 'typeorm';

import userStatus from 'src/logic/userStatus/userStatus.enum';
import BaseEntity from './BaseEntity';
import VText from './VText';

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
    return getManager().find(VText, { where: { translationID: this.nameID } });
  }

  @Field(() => VText)
  async name(@Arg('langID', { defaultValue: 'EN' }) langID: string) {
    return getManager().findOne(VText, {
      where: {
        translationID: this.nameID,
        langID,
      },
    });
  }

  @Field(() => [VText], { nullable: true })
  async descriptions() {
    return getManager().find(VText, { where: { translationID: this.descriptionID } });
  }

  @Field(() => VText, { nullable: true })
  async description(@Arg('langID', { defaultValue: 'EN' }) langID: string) {
    return getManager().findOne(VText, {
      where: {
        translationID: this.descriptionID,
        langID,
      },
    });
  }
}
