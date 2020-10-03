import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate,
} from 'typeorm';
import argon2 from 'argon2';

import BaseEntity from './BaseEntity';

@ObjectType()
@Entity()
class User extends BaseEntity {
 @Field(() => Int)
    @PrimaryGeneratedColumn({ name: 'user_id' })
    userID: number;

    @Field(() => String)
    @Column({ name: 'first_name' })
    firstName: string;

    @Field(() => String)
    @Column({ name: 'last_name' })
    lastName: string;

    @Field(() => String)
    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async updateRow() {
      const hashedPassword = await argon2.hash(this.password);
      this.password = hashedPassword;
    }
}

export default User;
