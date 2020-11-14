import { registerEnumType } from 'type-graphql';

enum rolesEnum {
  superAdmin='superAdmin',
  admin='admin',
}

registerEnumType(rolesEnum, {
  name: 'rolesEnum',
  description: 'All possible roles',
});

export default rolesEnum;
