import { Resolver, Query, UseMiddleware } from 'type-graphql';
import User from '../../../db/entities/User';
import isAuth from '../../../util/graphql/isAuth';

@Resolver()
class UserResolver {
  @Query(() => [User])
  @UseMiddleware(isAuth)
  users() {
    return User.find();
  }
}

export default UserResolver;
