import request from 'supertest';
import { Express } from 'express';

import assertJsonStructureGraphQL from '~src/tests/config/assertJsonStructureGraphQL';
import Lang from '~src/db/entities/Lang';

const langCreateTest = (app: Express, token: string, done: jest.DoneCallback) => {
  const id = 'langCreate';
  const data = {
    query: `mutation langCreate($id: String!, $name: String!, $localname: String!){
      langCreate(id: $id, name: $name, localname: $localname) {
        data {
          id
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
      id,
      name: 'Test',
      localname: 'Test',
    },
  };

  const rules = {
    'langCreate.data.id': 'required|string',
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
      await Lang.delete(id);
      const result = await assertJsonStructureGraphQL(res, err, rules);
      if (result.status) {
        done();
      } else {
        done.fail(result.description);
      }
    });
};

export default langCreateTest;
