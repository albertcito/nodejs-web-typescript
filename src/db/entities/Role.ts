import {
  Field, ObjectType, Int, Arg,
} from 'type-graphql';
import {
  Entity, PrimaryColumn, Column,
} from 'typeorm';

import BaseEntity from './BaseEntity';
import VText from './VText';

import roles from '~src/logic/role/role.enum';

@ObjectType()
@Entity({ name: 'role' })
export default class Role extends BaseEntity {
  @Field(() => roles)
  @PrimaryColumn()
  id: roles;

  @Field(() => Int)
  @Column({ name: 'name_id' })
  nameID: number;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'description_id' })
  descriptionID: number;

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
