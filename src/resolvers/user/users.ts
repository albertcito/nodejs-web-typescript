import { ApolloServerContext } from "src/ApolloServerContext";
import { User } from "../../db/entities/User";
import { Resolver, Query, Ctx } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users(@Ctx() { db }: ApolloServerContext) {
    return db.manager.find(User, {});
  }
}
