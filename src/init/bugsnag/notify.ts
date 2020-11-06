import { Request } from 'express';
import Bugsnag from '@bugsnag/js';

import Auth from '../../util/session/Auth';

const notify = (error: Error, req: Request) => {
  const auth = Auth.data()?.auth;
  const user = Auth.data()?.user;
  Bugsnag.notify(error, (event) => {
    event.addMetadata('query', req.query);
    event.addMetadata('body', req.body);
    event.addMetadata('request', {
      originalUrl: req.originalUrl,
      url: req.url,
      baseUrl: req.baseUrl,
      method: req.method,
      path: req.path,
      hostname: req.hostname,
      httpVersion: req.httpVersion,
      httpVersionMajor: req.httpVersionMajor,
      httpVersionMinor: req.httpVersionMinor,
      userID: user?.userID,
      emailVerified: user?.emailVerified,
      oauthAccessTokenID: auth?.oauthAccessTokenID,
      ...req.headers,
    });
  });
};

export default notify;
