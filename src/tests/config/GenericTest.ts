import request from 'supertest';
import { Express } from 'express';

import assertJsonStructureGraphQL from './assertJsonStructureGraphQL';
import GenericTestData from './GenericTestData';
import { path } from '../../init/graphql/public/server';

class GenericTest {
  public readonly url = path

  private readonly app: Express;

  constructor(app: Express) {
    this.app = app;
  }

  async test(done: jest.DoneCallback, data: GenericTestData, token?: string) {
    const config: any = {
      Accept: 'application/json',
    };
    if (token) {
      config.Authorization = `Bearer ${token}`;
    }

    const resolver = await data.resolver();
    request(this.app)
      .post(this.url)
      .set(config)
      .send(resolver)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => assertJsonStructureGraphQL(done, res, err, data.rules()));
  }
}

export default GenericTest;
