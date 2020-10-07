import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';
import BaseEntity from './BaseEntity';

@ObjectType()
@Entity({ name: 'oauth_access_tokens', schema: 'public' })
class OauthAccessToken extends BaseEntity {
 @Field(() => Int)
    @PrimaryGeneratedColumn({ name: 'oauth_access_token_id' })
    oauthAccessTokenID: number;

    @Field(() => Int)
    @Column({ name: 'user_id' })
    userID: number;

    @Field(() => String)
    @Column()
    signature: string;

    @Field(() => String)
    @Column()
    token: string;

    @Field(() => Boolean)
    @Column()
    revoked: boolean;

    @Column({ name: 'expired_at' })
    expiredAt: Date;
}

export default OauthAccessToken;
