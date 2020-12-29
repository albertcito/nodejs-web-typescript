import {
  Resolver, Query, UseMiddleware, Arg, Int,
} from 'type-graphql';

import isAuth from 'src/util/graphql/isAuth';
import User from 'src/db/entities/User';

@Resolver()
class UserResolver {
  @Query(() => User)
  @UseMiddleware(isAuth)
  async user(
    @Arg('id', () => Int, { defaultValue: 1, nullable: true }) id: number,
  ): Promise<User> {
    return User.findOneOrFail(id);
  }
}

export default UserResolver;
