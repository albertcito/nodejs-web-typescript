import request from 'supertest';
import { Express } from 'express';

import assertJsonStructureGraphQL from '../../../config/assertJsonStructureGraphQL';
import Lang from '../../../../db/entities/Lang';

const langUpdateTest = async (app: Express, token: string, done: jest.DoneCallback) => {
  const lang = new Lang();
  const langID = 'langUpdate';
  lang.langID = langID;
  lang.name = 'TEST';
  lang.localname = 'TEST';
  await lang.save();

  const data = {
    query: `mutation langUpdate($options: LangInput!){
      langUpdate(options: $options) {
        langID
        name
        localname
      }
    }`,
    variables: {
      options: {
        langID,
        name: 'Test',
        localname: 'Test',
      },
    },
  };

  const rules = {
    'langUpdate.langID': 'required|string',
    'langUpdate.localname': 'required|string',
    'langUpdate.name': 'required|string',
  };

  request(app)
    .post('/graphql')
    .send(data)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(async (err, res) => {
      await lang.remove();
      await assertJsonStructureGraphQL(done, res, err, rules);
    });
};

export default langUpdateTest;
