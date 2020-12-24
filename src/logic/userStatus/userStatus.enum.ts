import { registerEnumType } from 'type-graphql';

enum userStatusEnum {
  active='active',
  disabled='disabled',
  locked='locked',
}

registerEnumType(userStatusEnum, {
  name: 'userStatusEnum',
  description: 'All possible user status',
});

export default userStatusEnum;
