import 'reflect-metadata';
import express, { Express } from 'express';
// import session from 'express-session';

import initApolloServer from './apolloServer';
// import redisSession from './config/redisSession';

const getApp = async (): Promise<Express> => {
  const app = express();
  // app.use(session(redisSession));
  app.get('/hello', (_, res) => {
    res.json({ hello: 'hello' });
  });
  await initApolloServer(app);
  return app;
};

export default getApp;
