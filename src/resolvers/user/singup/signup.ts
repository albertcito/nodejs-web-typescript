import { ApolloServerContext } from "src/ApolloServerContext";
import { User } from "../../../db/entities/User";
import { Resolver, Mutation, Ctx, Arg } from "type-graphql";
import { SignUpInput, rules } from "./signupInput";
import  { getErrors } from '../../../util/validatorjs';
import { UserResponse } from "../userResponse";
import argon2 from "argon2";

@Resolver()
export class SignUpResolver {

  @Mutation(() => UserResponse)
  async signUp(
    @Arg("options") options: SignUpInput,
    @Ctx() { db }: ApolloServerContext
  ): Promise<UserResponse> {

    const errors = await getErrors(options, rules);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    const user = new User();
    user.email = options.email;
    user.firstName = options.firstName;
    user.lastName = options.lastName;
    user.password = hashedPassword;
    await db.manager.save(user);

    return { user };
  }
}
