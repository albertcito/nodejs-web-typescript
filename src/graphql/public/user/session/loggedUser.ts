import { __ } from 'i18n';
import {
  Resolver, Mutation, UseMiddleware,
} from 'type-graphql';

import Auth from '../../../../util/session/Auth';
import isAuth from '../../../../util/graphql/isAuth';
import MessageError from '../../../../util/exceptions/MessageError';
import User from '../../../../db/entities/User';

@Resolver()
export default class LoggedUserResolver {
  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async loggedUser(): Promise<User> {
    const user = Auth.data()?.user;
    if (!user) {
      throw new MessageError(__('The item %s does not exists', ''));
    }
    return user;
  }
}