import argon2 from 'argon2';

import userOauthCreate from '../oauth/userOauthCreate';
import User from '../../db/entities/User';
import { getFieldErrors } from '../../util/validatorjs';
import MessageError from '../../util/exceptions/MessageError';
import ValidatorError from '../../util/exceptions/ValidatorError';
import LoginResponse from '../../graphql/type/LoginResponse';

const login = async (email: string, password: string): Promise<LoginResponse> => {
  const errors = await getFieldErrors({ email, password }, {
    email: 'required|email',
    password: 'required|min:4',
  });

  if (errors) {
    throw new ValidatorError(errors);
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new MessageError('The email does not exist or the password does not match');
  }

  const valid = await argon2.verify(user.password, password);
  if (!valid) {
    throw new MessageError('The email does not exist or the password does not match');
  }

  const userToken = await userOauthCreate(user.userID);

  return {
    user,
    token: userToken.token,
  };
};

export default login;
