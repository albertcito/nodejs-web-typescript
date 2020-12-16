import {
  Field, ObjectType, Int, Arg,
} from 'type-graphql';
import {
  Entity, PrimaryColumn, Column, getManager,
} from 'typeorm';

import BaseEntity from './BaseEntity';
import VText from './VText';
import roles from '../../logic/role/role.enum';

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
