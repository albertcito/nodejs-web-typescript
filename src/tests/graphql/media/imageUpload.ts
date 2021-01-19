import request from 'supertest';
import { Express } from 'express';
import { join } from 'path';

import assertJsonStructureGraphQL from 'src/tests/config/assertJsonStructureGraphQL';

const imageUploadTest = (app: Express, token: string, done: jest.DoneCallback) => {
  const query = `mutation imageUpload($file: Upload!) {
    imageUpload(file: $file) {
      id
      mime
      name
      size
      ext
      width
      height
      __typename
    }
  }`;
  const operations = {
    operations: {
      query,
      operationName: 'imageUpload',
      variables: { file: null },
    },
    map: { 1: ['variables.file'] },
  };

  const rules = {
    'imageUpload.id': 'required|integer',
    'imageUpload.ext': 'required|string',
    'imageUpload.mime': 'required|string',
    'imageUpload.name': 'required|string',
    'imageUpload.size': 'required|integer',
    'imageUpload.width': 'required|integer',
    'imageUpload.height': 'required|integer',
  };

  const imagePath = join(__dirname, './meme.jpeg');
  request(app)
    .post('/graphql')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .expect('Content-Type', /json/)
    .field('operations', JSON.stringify(operations.operations))
    .field('map', JSON.stringify(operations.map))
    .attach('1', imagePath)
    .expect(200)
    .end(async (err, res) => {
      const result = await assertJsonStructureGraphQL(res, err, rules);
      if (result.status) {
        done();
      } else {
        done.fail(result.description);
      }
    });
};

export default imageUploadTest;
