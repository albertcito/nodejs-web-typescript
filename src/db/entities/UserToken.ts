import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, BeforeInsert,
} from 'typeorm';
import argon2 from 'argon2';
import BaseEntity from './BaseEntity';

@ObjectType()
@Entity()
class UserToken extends BaseEntity {
 @Field(() => Int)
    @PrimaryGeneratedColumn({ name: 'user_token_id' })
    userTokenID: number;

    @Field(() => Int)
    @Column({ name: 'user_id' })
    userID: number;

    @Field(() => String)
    @Column()
    token: string;

    @Field(() => String)
    @Column()
    type: string;

    @Column({ name: 'used_at' })
    usedAt: Date;

    @Column({ name: 'expired_at' })
    expiredAt: Date;

    @BeforeInsert()
    async updateRow() {
      this.token = await argon2.hash('signature');
    }
}

export default UserToken;
