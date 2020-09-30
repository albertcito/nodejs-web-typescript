import { User } from "../../db/entities/User";
import { ObjectType, Field } from "type-graphql";
import { FieldError } from "../errors/FieldError";

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
