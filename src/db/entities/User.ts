import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
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
}

export default User;
