import request from 'supertest';
import { Express } from 'express';

import assertJsonStructureGraphQL from '../../../config/assertJsonStructureGraphQL';
import Lang from '../../../../db/entities/Lang';

const langDeleteTest = async (app: Express, token: string, done: jest.DoneCallback) => {
  const lang = new Lang();
  const langID = 'langDelete';
  lang.langID = langID;
  lang.name = 'TEST';
  lang.localname = 'TEST';
  await lang.save();

  const data = {
    query: `mutation langDelete($langID: String!){
      langDelete(langID:$langID)
    }`,
    variables: {
      langID,
    },
  };

  const rules = {
    langDelete: 'required|string',
  };

  request(app)
    .post('/graphql/private')
    .send(data)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(async (err, res) => {
      const user = await Lang.findOne(langID);
      if (user) {
        await user.remove();
      }
      await assertJsonStructureGraphQL(done, res, err, rules);
    });
};

export default langDeleteTest;
