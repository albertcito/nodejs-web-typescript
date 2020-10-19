import request from 'supertest';
import { Express } from 'express';

import assertJsonStructureGraphQL from '../../../config/assertJsonStructureGraphQL';

const forgotPasswordTest = (app: Express, done: jest.DoneCallback) => {
  const data = {
    query: `mutation forgotPassword($email: String!) {
      forgotPassword(email: $email)
    }`,
    variables: {
      email: 'me@albertcito.com',
    },
  };

  const rules = {
    forgotPassword: 'required|string',
  };

  request(app)
    .post('/graphql/public')
    .send(data)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(async (err, res) => assertJsonStructureGraphQL(done, res, err, rules));
};

export default forgotPasswordTest;
