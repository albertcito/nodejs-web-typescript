import request from 'supertest';
import { Express } from 'express';
import assertJsonStructureGraphQL from '../../../config/assertJsonStructureGraphQL';

const langTest = (app: Express, token: string, done: jest.DoneCallback) => {
  const data = {
    query: `query lang($langID: String!){
      lang(langID: $langID) {
        langID
        localname
        name
      }
    }`,
    variables: {
      langID: 'EN',
    },
  };

  const rules = {
    'lang.langID': 'required|string',
    'lang.localname': 'required|string',
    'lang.name': 'required|string',
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

export default langTest;
