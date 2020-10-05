import 'reflect-metadata';
import express, { Express } from 'express';
import { ConnectionOptions, createConnection } from 'typeorm';

import initApolloServer from './apollo/apolloServer';
import ormconfig from '../../ormconfig.json';

const getApp = async (): Promise<Express> => {
  const app = express();
  const db = await createConnection(ormconfig as ConnectionOptions);
  await initApolloServer(app, db);
  return app;
};

export default getApp;
