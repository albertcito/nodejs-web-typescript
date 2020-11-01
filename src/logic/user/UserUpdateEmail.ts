import argon2 from 'argon2';
import { validateAsync, arg } from 'validatorjs-decorator';
import User from '../../db/entities/User';
import MessageError from '../../util/exceptions/MessageError';

export default class UserUpdateEmail {
  private readonly user: User;

  constructor(user: User) {
    this.user = user;
  }

  @validateAsync()
  async update(@arg('email', 'required|email') email: string, password?: string) {
    if (password) {
      const valid = await argon2.verify(this.user.password, password);
      if (!valid) {
        throw new MessageError('The password does not match');
      }
    }
    this.user.email = email;
    return this.user.save();
  }
}
