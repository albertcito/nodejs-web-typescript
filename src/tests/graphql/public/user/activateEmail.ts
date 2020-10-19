import request from 'supertest';
import { Express } from 'express';

import assertJsonStructureGraphQL from '../../../config/assertJsonStructureGraphQL';
import getFakerUser from '../../../../db/factories/user.factory';
import UserToken from '../../../../logic/user/UserToken';
import UserTokenEnum from '../../../../logic/user/UserTokenEnum';

const activateEmailTest = async (app: Express, done: jest.DoneCallback) => {
  // create a user
  const user = getFakerUser();
  await user.save();
  // add token to activate email
  const userToken = new UserToken(user.userID);
  const token = await userToken.newToken(48, UserTokenEnum.ACTIVATE_EMAIL);

  const data = {
    query: `mutation activateEmail($token: String!) {
      activateEmail(token: $token)
    }`,
    variables: {
      token: token.token,
    },
  };

  const rules = {
    activateEmail: 'required|string',
  };

  request(app)
    .post('/graphql/public')
    .send(data)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(async (err, res) => assertJsonStructureGraphQL(done, res, err, rules));
};

export default activateEmailTest;
