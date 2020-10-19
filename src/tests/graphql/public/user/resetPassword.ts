import request from 'supertest';
import { Express } from 'express';

import assertJsonStructureGraphQL from '../../../config/assertJsonStructureGraphQL';
import ForgotPassword from '../../../../logic/user/ForgotPassword';

const resetPasswordTest = async (app: Express, done: jest.DoneCallback) => {
  const forgotPassword = new ForgotPassword('me@albertcito.com');
  const token = await forgotPassword.getToken();
  const data = {
    query: `mutation resetPassword(
      $token: String!
      $password: String!
      $passwordConfirm: String!
    ) {
      resetPassword(
        token: $token
        password: $password
        password_confirmation: $passwordConfirm
      )
    }`,
    variables: {
      token: token.token,
      password: 'Hola12345',
      passwordConfirm: 'Hola12345',
    },
  };

  const rules = {
    resetPassword: 'required|string',
  };

  request(app)
    .post('/graphql/public')
    .send(data)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(async (err, res) => assertJsonStructureGraphQL(done, res, err, rules));
};

export default resetPasswordTest;
