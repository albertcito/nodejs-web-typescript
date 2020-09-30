import { ApolloServerContext } from 'ApolloServerContext';
import { Resolver, Query, Ctx } from 'type-graphql';
import User from '../../db/entities/User';

@Resolver()
class UserResolver {
  @Query(() => [User])
  users(@Ctx() { db }: ApolloServerContext) {
    return db.manager.find(User, {});
  }
}

export default UserResolver;
