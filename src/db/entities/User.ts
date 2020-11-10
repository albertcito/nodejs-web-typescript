import {
  Field, Int, ObjectType,
} from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToMany, JoinTable,
} from 'typeorm';
import argon2 from 'argon2';

import BaseEntity from './BaseEntity';
import Role from './Role';

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
  @Column({ unique: true })
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

  @Field(() => [Role])
  @ManyToMany(() => Role, { eager: true })
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: Role[];

  @BeforeInsert()
  async insertRow() {
    const hashedPassword = await argon2.hash(this.password);
    this.password = hashedPassword;
    this.emailVerified = !!this.emailVerified;
  }
}

export default User;
