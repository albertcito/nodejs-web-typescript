import { arg, validateClass } from 'validatorjs-decorator/dist';

import UserToken from './UserToken';
import userStatus from '../../userStatus/userStatus.enum';
import UserTokenEnum from './UserTokenEnum';
import User from '../../../db/entities/User';
import Email from '../../../util/email/Email';
import TransactionInterface from 'util/db/TransactionInterface';

@validateClass()
class BasicSignUp implements TransactionInterface<User> {
  private readonly firstName: string;

  private readonly lastName: string;

  private readonly email: string;

  private readonly password: string;

  public constructor(
    @arg('firstName', 'required|string') firstName: string,
    @arg('lastName', 'required|string') lastName: string,
    @arg('email', 'required|email') email: string,
    @arg('password', 'required|min:4|strict_password') password: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  async save() {
    const user = new User();
    user.email = this.email;
    user.firstName = this.firstName;
    user.lastName = this.lastName;
    user.password = this.password;
    user.userStatusID = userStatus.active;
    await user.save();

    const link = await (new UserToken(user.id)).tokenLink(48, UserTokenEnum.ACTIVATE_EMAIL);
    const to = { name: user.fullName, address: this.email };
    await (new Email('emails.activateAccount')).send(
      { to, subject: 'signup' },
      { name: user.fullName, link },
      user.id,
    );

    return user;
  }
}

export default BasicSignUp;
