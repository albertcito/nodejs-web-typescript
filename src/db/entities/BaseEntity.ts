import { Field, ObjectType, Int } from 'type-graphql';
import {
  CreateDateColumn, BeforeInsert, BeforeUpdate, BaseEntity,
} from 'typeorm';
import Auth from '../../util/session/Auth';

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

    @Field(() => Int, { nullable: true })
    @CreateDateColumn({ name: 'updated_by', nullable: true })
    updatedBy?: number;

    @BeforeInsert()
    @BeforeUpdate()
    updateRowAt() {
      this.updatedAt = new Date();
      const user = Auth.user();
      this.updatedBy = user ? user.userID : undefined;
    }

    @BeforeInsert()
    insertRowAt() {
      this.createdAt = new Date();
      const user = Auth.user();
      if (user) {
        this.createdBy = user.userID;
      }
    }
}

export default BaseDataEntity;
