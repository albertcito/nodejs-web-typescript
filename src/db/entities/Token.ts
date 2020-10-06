import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';
import BaseEntity from './BaseEntity';

@ObjectType()
@Entity()
class UserToken extends BaseEntity {
 @Field(() => Int)
    @PrimaryGeneratedColumn({ name: 'token_id' })
    tokenID: number;

    @Field(() => Int)
    @Column()
    token: number;

    @Field(() => String)
    @Column()
    type: string;

    @Column({ name: 'used_at' })
    usedAt: Date;

    @Column({ name: 'expired_at' })
    expiredAt: Date;
}

export default UserToken;
