import { Resolver, Query } from 'type-graphql';

import roles from 'src/logic/role/role.enum';
import isAuthRolesGraphQL from 'src/util/graphql/isAuthRolesGraphQL';
import UserStatus from 'src/db/entities/UserStatus';

@Resolver()
export default class UserStatusUpdateResolver {
  @Query(() => [UserStatus])
  @isAuthRolesGraphQL([roles.admin, roles.superAdmin])
  async userStatuses(): Promise<UserStatus[]> {
    return UserStatus.find();
  }
}
