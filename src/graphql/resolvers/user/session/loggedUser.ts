import {
  Resolver, Mutation, UseMiddleware,
} from 'type-graphql';

import Auth from 'src/util/session/Auth';
import isAuth from 'src/util/graphql/isAuth';
import User from 'src/db/entities/User';

@Resolver()
export default class LoggedUserResolver {
  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async loggedUser(): Promise<User> {
    return Auth.session().user;
  }
}
