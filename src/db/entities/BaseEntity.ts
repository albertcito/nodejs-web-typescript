import { Field, ObjectType } from 'type-graphql';
import { CreateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

@ObjectType()
class BaseEntity {
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

export default BaseEntity;
