import request from 'supertest';
import { Express } from 'express';

import assertJsonStructureGraphQL from '../../../config/assertJsonStructureGraphQL';
import Lang from '../../../../db/entities/Lang';

const langCreateTest = (app: Express, token: string, done: jest.DoneCallback) => {
  const langID = 'langCreate';
  const data = {
    query: `mutation langCreate($langID: String!, $name: String!, $localname: String!){
      langCreate(langID: $langID, name: $name, localname: $localname) {
        langID
        name
        localname
      }
    }`,
    variables: {
      langID,
      name: 'Test',
      localname: 'Test',
    },
  };

  const rules = {
    'langCreate.langID': 'required|string',
    'langCreate.localname': 'required|string',
    'langCreate.name': 'required|string',
  };

  request(app)
    .post('/graphql/private')
    .send(data)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(async (err, res) => {
      await Lang.delete(langID);
      await assertJsonStructureGraphQL(done, res, err, rules);
    });
};

export default langCreateTest;