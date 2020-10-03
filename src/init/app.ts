import 'reflect-metadata';
import express, { Express } from 'express';
import { ConnectionOptions, createConnection } from 'typeorm';
// import session from 'express-session';

import initApolloServer from './apolloServer';
import ormconfig from '../../ormconfig.json';
// import redisSession from '../config/redisSession';

const getApp = async (): Promise<Express> => {
  const app = express();
  const db = await createConnection(ormconfig as ConnectionOptions);
  //  app.use(session(redisSession));
  app.get('/test', (_, res) => {
    res.json({ hello: 'test' });
  });
  await initApolloServer(app, db);
  return app;
};

export default getApp;
