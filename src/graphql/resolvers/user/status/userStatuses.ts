import { Resolver, Query } from 'type-graphql';

import roles from '../../../../logic/role/role.enum';
import isAuthRolesGraphQL from '../../../../util/graphql/isAuthRolesGraphQL';
import UserStatus from '../../../../db/entities/UserStatus';

@Resolver()
export default class UserStatusUpdateResolver {
  @Query(() => [UserStatus])
  @isAuthRolesGraphQL([roles.admin, roles.superAdmin])
  async userStatuses(): Promise<UserStatus[]> {
    return UserStatus.find();
  }
}
