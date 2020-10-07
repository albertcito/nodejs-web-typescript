import request from 'supertest';
import { Express } from 'express';

import assertJsonStructureGraphQL from '../../../config/assertJsonStructureGraphQL';

const usersTest = (app: Express, token: string, done: jest.DoneCallback) => {
  const data = {
    query: `{
      users {
        userID
        firstName
        lastName
        email
      }
    }`,
  };

  const rules = {
    'users.*.userID': 'required|integer',
    'users.*.firstName': 'required|string',
    'users.*.lastName': 'required|string',
    'users.*.email': 'required|email',
  };

  request(app)
    .post('/graphql')
    .send(data)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(async (err, res) => assertJsonStructureGraphQL(done, res, err, rules));
};

export default usersTest;
