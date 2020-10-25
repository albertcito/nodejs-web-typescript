import User from '../../db/entities/User';

class UserName {
  private readonly user: User;

  constructor(user: User) {
    this.user = user;
  }

  getFullName() {
    return `${this.user.firstName} ${this.user.lastName}`;
  }
}

export default UserName;
