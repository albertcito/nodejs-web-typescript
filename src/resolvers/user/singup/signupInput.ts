/* eslint-disable camelcase */
import { InputType, Field } from 'type-graphql';

@InputType()
export class SignUpInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  password_confirmation: string;
}

export const rules = {
  firstName: 'required|string',
  lastName: 'required|string',
  email: 'required|email|exist:public.user,email',
  password: 'required|min:4|confirmed|strict_password',
};
