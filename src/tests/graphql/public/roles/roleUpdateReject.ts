import request from 'supertest';
import { Express } from 'express';

import roles from '../../../../logic/role/role.enum';

export default class RoleUpdateTest {
  private readonly url: string;

  private readonly app: Express;

  constructor(url: string, app: Express) {
    this.url = url;
    this.app = app;
  }

  resolver() {
    return {
      query: `mutation roleUpdate($roleID: rolesEnum!, $nameID: Int! $descriptionID: Int!){
        roleUpdate(roleID: $roleID, nameID: $nameID, descriptionID: $descriptionID) {
          data {
            id
            nameID
            descriptionID
          }
          message {
            type
            message
          }
        }
      }`,
      variables: {
        roleID: roles.superAdmin,
        nameID: 1,
        descriptionID: 1,
      },
    };
  }

  test(done: jest.DoneCallback, token: string) {
    request(this.app)
      .post(this.url)
      .set({
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      })
      .send(this.resolver())
      .end(async (_err, res) => {
        if (res.status === 403) {
          done();
        } else {
          done.fail('The query data is empty');
        }
      });
  }
}
