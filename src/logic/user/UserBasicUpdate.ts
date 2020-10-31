import { validateAsync, arg } from 'validatorjs-decorator';
import User from '../../db/entities/User';

class UserBasicUpdate {
    private readonly user: User;

    constructor(user: User) {
      this.user = user;
    }

    @validateAsync()
    update(
        @arg('firstName', 'requiere|string|min:1') firstName: string,
        @arg('lastName', 'requiere|string|min:1') lastName: string,
    ) {
      this.user.firstName = firstName;
      this.user.lastName = lastName;
      this.user.save();
    }
}
export default UserBasicUpdate;
