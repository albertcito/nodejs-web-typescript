import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate,
} from 'typeorm';
import argon2 from 'argon2';

import BaseEntity from './BaseEntity';

@ObjectType()
@Entity({ name: 'user' })
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

  @Field(() => Boolean)
  @Column({ name: 'email_verified' })
  emailVerified: boolean;

  @Field()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @BeforeInsert()
  async insertRow() {
    const hashedPassword = await argon2.hash(this.password);
    this.password = hashedPassword;
    this.emailVerified = !!this.emailVerified;
  }
}

export default User;
