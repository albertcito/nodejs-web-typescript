/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

import { registerEnumType } from 'type-graphql';

enum roles {
  superAdmin='superAdmin',
  admin='admin',
}

registerEnumType(roles, {
  name: 'roles',
  description: 'All possible roles',
});

export default roles;
