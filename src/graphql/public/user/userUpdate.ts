// eslint-disable-next-line max-classes-per-file
import { __ } from 'i18n';
import {
  Resolver, Mutation, UseMiddleware, Arg, Int, ObjectType,
} from 'type-graphql';

import isAuth from '../../../util/graphql/isAuth';
import MessageError from '../../../util/exceptions/MessageError';
import User from '../../../db/entities/User';
import MessageResponse from '../../type/MessageResponse';

@ObjectType()
class UserUpdateResponse extends MessageResponse(User) {}

@Resolver()
class UserUpdateResolver {
  @Mutation(() => UserUpdateResponse)
  @UseMiddleware(isAuth)
  async userUpdate(
    @Arg('userID', () => Int) userID: number,
    @Arg('firstName', () => String) firstName: string,
    @Arg('lastName', () => String) lastName: string,
  ): Promise<UserUpdateResponse> {
    const user = await User.findOne(userID);
    if (!user) {
      throw new MessageError(__('The item %s does not exists', `${userID}`));
    }
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();
    return {
      data: user,
      messages: [{
        message: __('The item %s was updated succesfully', `${userID}`),
        type: 'success',
      }],
    };
  }
}

export default UserUpdateResolver;
