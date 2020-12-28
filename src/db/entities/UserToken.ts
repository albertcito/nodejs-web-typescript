import crypto from 'crypto';
import {
  Field, Int, ObjectType, Float,
} from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, BeforeInsert,
} from 'typeorm';

import BaseEntity from './BaseEntity';

@ObjectType()
@Entity()
class UserToken extends BaseEntity {
 @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Int)
    @Column({ name: 'user_id' })
    userID: number;

    @Field(() => String)
    @Column()
    token: string;

    @Field(() => String)
    @Column()
    type: string;

    @Field(() => Float, { nullable: true })
    @Column({ name: 'used_at' })
    usedAt: Date;

    @Field(() => Float)
    @Column({ name: 'expired_at' })
    expiredAt: Date;

    @BeforeInsert()
    async insertRow() {
      this.token = crypto.randomBytes(256).toString('hex');
    }
}

export default UserToken;
