import { Field, ObjectType } from "type-graphql";
import {  CreateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";

@ObjectType()
export class BaseEntity {

    @Field(() => String)
    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @Field(() => String)
    @CreateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    updateRow() {
        this.updatedAt = new Date();
    }

    @BeforeInsert()
    insertRow() {
        this.createdAt = new Date();
    }

}
