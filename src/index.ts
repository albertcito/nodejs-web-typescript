import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import session from 'express-session';
import apolloScheme from './config/apolloSchema';
import ormconfig from '../ormconfig.json';
import redisSession from './config/redisSession';
import { ApolloServerContext } from './ApolloServerContext';

const main = async () => {
  const app = express();
  app.use(session(redisSession));
  const db = await createConnection(ormconfig as ConnectionOptions);
  const apolloServer = new ApolloServer({
    schema: await buildSchema(apolloScheme),
    context: ({ req, res }): ApolloServerContext => ({ db, req, res }),
  });
  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    // eslint-disable-next-line no-console
    console.info('Server started at localhost:4000');
  });
};

main();
