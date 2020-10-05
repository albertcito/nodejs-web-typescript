import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';
import BaseEntity from './BaseEntity';

@ObjectType()
@Entity()
class UserTokenUse extends BaseEntity {
 @Field(() => Int)
    @PrimaryGeneratedColumn({ name: 'user_token_use_id' })
    userTokenUseID: number;

    @Field(() => Int)
    @Column({ name: 'user_token_id' })
    userTokenID: number;

    @Field(() => String)
    @Column()
    ip: string;

    @Column({ name: 'used_at' })
    usedAt: Date;
}

export default UserTokenUse;
