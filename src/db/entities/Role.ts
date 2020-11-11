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
  @PrimaryColumn({ name: 'role_id' })
  roleID: roles;

  @Field(() => Int)
  @Column({ name: 'translation_id' })
  translationID: number;

  @Field(() => String)
  @Column()
  description: string;

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
