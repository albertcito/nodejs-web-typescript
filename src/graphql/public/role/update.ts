// eslint-disable-next-line max-classes-per-file
import { __ } from 'i18n';
import {
  Resolver, Mutation, Arg, ObjectType,
} from 'type-graphql';

import MessageResponse from '../../type/MessageResponse';
import MessageType from '../../type/MessageType.enum';

import Role from '~src/db/entities/Role';
import MessageError from '~src/util/exceptions/MessageError';
import roles from '~src/logic/role/role.enum';
import isAuthRolesGraphQL from '~src/util/graphql/isAuthRolesGraphQL';

@ObjectType()
class RoleUpdateResponse extends MessageResponse(Role) {}

@Resolver()
class RoleUpdateResolver {
  @Mutation(() => RoleUpdateResponse)
  @isAuthRolesGraphQL([roles.superAdmin])
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
