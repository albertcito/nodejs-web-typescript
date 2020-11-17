import { __ } from 'i18n';
import {
  Resolver, Query, UseMiddleware, Arg, Int,
} from 'type-graphql';

import isAuth from '~src/util/graphql/isAuth';
import MessageError from '~src/util/exceptions/MessageError';
import User from '~src/db/entities/User';

@Resolver()
class UserResolver {
  @Query(() => User)
  @UseMiddleware(isAuth)
  async user(
    @Arg('id', () => Int, { defaultValue: 1, nullable: true }) id: number,
  ): Promise<User> {
    const user = await User.findOne(id);
    if (!user) {
      throw new MessageError(__('The item %s does not exists', `${id}`));
    }
    return user;
  }
}

export default UserResolver;
