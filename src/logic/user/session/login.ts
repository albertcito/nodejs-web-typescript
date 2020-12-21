import argon2 from 'argon2';
import { validateClass, arg } from 'validatorjs-decorator';
import { __ } from 'i18n';

import userOauthCreate from '../../oauth/userOauthCreate';
import User from '../../../db/entities/User';
import MessageError from '../../../util/exceptions/MessageError';
import LoginResponse from '../../../graphql/type/LoginResponse';
import Auth from '../../../util/session/Auth';

@validateClass()
class Login {
  private readonly email: string;

  private readonly password: string;

  constructor(
    @arg('email', 'required|email') email: string,
    @arg('password', 'required|min:4') password: string,
  ) {
    this.email = email;
    this.password = password;
  }

  public async getUser(): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email: this.email } });

    if (!user) {
      throw new MessageError(__('emailPasswordError'));
    }

    const valid = await argon2.verify(user.password, this.password);
    if (!valid) {
      throw new MessageError(__('emailPasswordError'));
    }

    const auth = await userOauthCreate(user.id);

    Auth.setSession({
      user,
      auth,
    });

    return {
      user,
      token: auth.token,
    };
  }
}

export default Login;
