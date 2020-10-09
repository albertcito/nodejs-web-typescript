import request from 'supertest';
import { Express } from 'express';

import assertJsonStructureGraphQL from '../../../config/assertJsonStructureGraphQL';

const usersTest = (app: Express, token: string, done: jest.DoneCallback) => {
  const data = {
    query: `{
      users {
        pagination {
          from
          to
          total
          limit
          page
          length
        }
        data {
          userID
          firstName
          lastName
          email
        }
      }
    }`,
  };

  const rules = {
    'users.data.*.userID': 'required|integer',
    'users.data.*.firstName': 'required|string',
    'users.data.*.lastName': 'required|string',
    'users.data.*.email': 'required|email',
  };

  request(app)
    .post('/graphql/private')
    .send(data)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(async (err, res) => assertJsonStructureGraphQL(done, res, err, rules));
};

export default usersTest;
