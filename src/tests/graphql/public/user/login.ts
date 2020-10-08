import request from 'supertest';
import { Express } from 'express';

import assertJsonStructureGraphQL from '../../../config/assertJsonStructureGraphQL';

const loginTest = (app: Express, done: jest.DoneCallback) => {
  const data = {
    query: `query login($email: String!, $password:String!) {
      login(email:$email, password:$password) {
        user {
          userID
          firstName
          lastName
          email
        }
        token
      }
    }`,
    variables: {
      email: 'me@albertcito.com',
      password: '123456',
    },
  };

  const rules = {
    'login.token': 'required|string',
    'login.user.userID': 'required|integer',
    'login.user.firstName': 'required|string',
    'login.user.lastName': 'required|string',
    'login.user.email': 'required|email',
  };

  request(app)
    .post('/graphql/public')
    .send(data)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(async (err, res) => assertJsonStructureGraphQL(done, res, err, rules));
};

export default loginTest;
