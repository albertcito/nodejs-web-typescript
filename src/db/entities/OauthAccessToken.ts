import {
  Field, Int, ObjectType, Float,
} from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, BeforeInsert,
} from 'typeorm';

import BaseEntity from './BaseEntity';

@ObjectType()
@Entity({ name: 'oauth_access_tokens' })
class OauthAccessToken extends BaseEntity {
 @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Int)
    @Column({ name: 'user_id' })
    userID: number;

    @Column()
    signature: string;

    @Column()
    token: string;

    @Field(() => Boolean)
    @Column()
    revoked: boolean;

    @Field(() => Float)
    @Column({ name: 'expired_at' })
    expiredAt: Date;

    @BeforeInsert()
    async insertRow() {
      this.revoked = !!this.revoked;
    }
}

export default OauthAccessToken;
