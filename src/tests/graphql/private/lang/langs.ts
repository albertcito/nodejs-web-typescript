import request from 'supertest';
import { Express } from 'express';

import assertJsonStructureGraphQL from '../../../config/assertJsonStructureGraphQL';

const langsTest = (app: Express, token: string, done: jest.DoneCallback) => {
  const data = {
    query: `{
      langs {
        langID
        localname
        name
      }
    }`,
  };

  const rules = {
    'langs.*.langID': 'required|string',
    'langs.*.localname': 'required|string',
    'langs.*.name': 'required|string',
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

export default langsTest;
