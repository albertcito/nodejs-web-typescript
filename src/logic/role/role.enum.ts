/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

import { registerEnumType } from 'type-graphql';

enum roles {
  superAdmin= 'super_admin',
  admin= 'admin',
}

registerEnumType(roles, {
  name: 'roles',
  description: 'All possible roles',
});

export default roles;
