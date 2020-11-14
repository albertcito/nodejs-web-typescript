import { registerEnumType } from 'type-graphql';

enum userStatusEnum {
  active='active',
  inactive='inactive',
}

registerEnumType(userStatusEnum, {
  name: 'userStatusEnum',
  description: 'All possible user status',
});

export default userStatusEnum;
