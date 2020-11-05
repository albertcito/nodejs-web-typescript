import request from 'supertest';
import { Express } from 'express';

import assertJsonStructureGraphQL from '~src/tests/config/assertJsonStructureGraphQL';
import Lang from '~src/db/entities/Lang';

const langCreateTest = (app: Express, token: string, done: jest.DoneCallback) => {
  const langID = 'langCreate';
  const data = {
    query: `mutation langCreate($langID: String!, $name: String!, $localname: String!){
      langCreate(langID: $langID, name: $name, localname: $localname) {
        data {
          langID
          name
          localname
        }
        message {
          type
          message
        }
      }
    }`,
    variables: {
      langID,
      name: 'Test',
      localname: 'Test',
    },
  };

  const rules = {
    'langCreate.data.langID': 'required|string',
    'langCreate.data.localname': 'required|string',
    'langCreate.data.name': 'required|string',
    'langCreate.message.type': 'required|string',
    'langCreate.message.message': 'required|string',
  };

  request(app)
    .post('/graphql/public')
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
