import request from 'supertest';
import { Express } from 'express';

import assertJsonStructureGraphQL from '../../../config/assertJsonStructureGraphQL';
import userStatus from '../../../../logic/userStatus/userStatus.enum';
import getFakerUser from '../../../../db/factories/user.factory';
import Login from '../../../../logic/user/session/login';
import OauthAccessToken from '../../../../db/entities/OauthAccessToken';
import User from '../../../../db/entities/User';

export default class UserStatusUpdateOauthTest {
  private readonly url: string;

  private readonly app: Express;

  constructor(url: string, app: Express) {
    this.url = url;
    this.app = app;
  }

  resolver(user: User) {
    return {
      query: `mutation userStatusUpdate($userID: Int!, $userStatusID: String!, $reason: String!) {
        userStatusUpdate(userID: $userID, userStatusID: $userStatusID, reason: $reason) {
          message
          type
        }
      }`,
      variables: {
        userID: user.id,
        userStatusID: userStatus.inactive,
        reason: 'test environment: updating user inactive user and verify revoke token',
      },
    };
  }

  rules() {
    return {
      userStatusUpdate: 'required',
      'userStatusUpdate.message': 'required|string',
      'userStatusUpdate.type': 'required|string',
    };
  }

  async getUserLogged() {
    const userPassword = 'hola12345';
    const user = getFakerUser(userPassword);
    user.userStatusID = userStatus.active;
    await user.save();
    // Create oAuthToken for this user
    await (new Login(user.email, userPassword).getUser());
    return user;
  }

  async test(done: jest.DoneCallback, token: string) {
    const user = await this.getUserLogged();
    request(this.app)
      .post(this.url)
      .set({
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      })
      .send(this.resolver(user))
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        const result = await assertJsonStructureGraphQL(res, err, this.rules());
        if (!result.status) {
          done.fail(result.description);
        } else {
          const noRevoked = await OauthAccessToken.find({
            where: {
              userID: user.id,
              revoked: false,
            },
          });
          if (noRevoked.length > 0) {
            done.fail(`All token must be revoked ${user.id}`);
          }
          done();
        }
      });
  }
}
