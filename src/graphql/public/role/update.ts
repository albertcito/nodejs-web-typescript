// eslint-disable-next-line max-classes-per-file
import { __ } from 'i18n';
import {
  Resolver, Mutation, Arg, UseMiddleware, ObjectType,
} from 'type-graphql';

import Role from '../../../db/entities/Role';
import MessageError from '../../../util/exceptions/MessageError';
import isAuth from '../../../util/graphql/isAuth';
import Validate from '../../../util/validatorjs/validateGraphQL';
import MessageResponse from '../../type/MessageResponse';
import MessageType from '../../type/MessageType.enum';
import roles from '../../../logic/role/role.enum';

@ObjectType()
class RoleUpdateResponse extends MessageResponse(Role) {}

@Resolver()
class RoleUpdateResolver {
  @Mutation(() => RoleUpdateResponse)
  @UseMiddleware(isAuth)
  @Validate({
    roleID: 'required|string',
    description: 'required|string',
  })
  async roleUpdate(
    @Arg('roleID', () => roles) roleID: roles,
    @Arg('description') description: string,
  ): Promise<RoleUpdateResponse> {
    const role = await Role.findOne(roleID);
    if (!role) {
      throw new MessageError(__('The item %s does not exists', roleID));
    }
    role.description = description;
    await role.save();
    return {
      data: role,
      message: {
        message: __('The item %s was updated', `${roleID}`),
        type: MessageType.success,
      },
    };
  }
}

export default RoleUpdateResolver;
