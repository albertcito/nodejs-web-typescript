import { Field, ObjectType } from 'type-graphql';
import {
  CreateDateColumn, BeforeInsert, BeforeUpdate, BaseEntity,
} from 'typeorm';

@ObjectType()
class BaseDataEntity extends BaseEntity {
    @Field(() => String)
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Field(() => String)
    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    updateRowAt() {
      this.updatedAt = new Date();
    }

    @BeforeInsert()
    insertRowAt() {
      this.createdAt = new Date();
    }
}

export default BaseDataEntity;
