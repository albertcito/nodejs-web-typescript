import { registerEnumType } from 'type-graphql';

enum userStatus {
  active='active',
  inactive='inactive',
}

registerEnumType(userStatus, {
  name: 'userStatus',
  description: 'All possible user status',
});

export default userStatus;
