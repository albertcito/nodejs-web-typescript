import { Field, ObjectType, Int } from 'type-graphql';
import {
  CreateDateColumn, BeforeInsert, BeforeUpdate, BaseEntity, getManager,
} from 'typeorm';

import Auth from '../../util/session/Auth';
import User from './User';

@ObjectType()
class BaseDataEntity extends BaseEntity {
    @Field(() => String)
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Field(() => String)
    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Field(() => Int, { nullable: true })
    @CreateDateColumn({ name: 'created_by', nullable: true })
    createdBy?: number;

    @Field(() => User, { nullable: true })
    createdByUser() {
      if (this.createdBy) {
        return getManager().findOne(User, this.createdBy);
      }
      return null;
    }

    @Field(() => User, { nullable: true })
    updatedByUser() {
      if (this.updatedBy) {
        return getManager().findOne(User, this.updatedBy);
      }
      return null;
    }

    @Field(() => Int, { nullable: true })
    @CreateDateColumn({ name: 'updated_by', nullable: true })
    updatedBy?: number;

    /**
     * Update the updated at and the updated by
     */
    @BeforeInsert()
    @BeforeUpdate()
    protected updateRowAt() {
      this.updatedAt = new Date();
      const data = Auth.sessionOrEmpty();
      this.updatedBy = data ? data.user.id : undefined;
    }

    /**
     * Update the created at and the created by
     */
    @BeforeInsert()
    protected insertRowAt() {
      this.createdAt = new Date();
      const data = Auth.sessionOrEmpty();
      if (data) {
        this.createdBy = data.user.id;
      }
    }
}

export default BaseDataEntity;
