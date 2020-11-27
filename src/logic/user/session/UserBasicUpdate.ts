import { validate, arg } from 'validatorjs-decorator';

import User from '../../../db/entities/User';

class UserBasicUpdate {
    private readonly user: User;

    constructor(user: User) {
      this.user = user;
    }

    @validate()
    async update(
        @arg('firstName', 'required|string|min:1') firstName: string,
        @arg('lastName', 'required|string|min:1') lastName: string,
    ) {
      this.user.firstName = firstName;
      this.user.lastName = lastName;
      return this.user.save();
    }
}
export default UserBasicUpdate;
