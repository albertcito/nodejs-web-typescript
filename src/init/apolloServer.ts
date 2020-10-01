import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';

import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import apolloScheme from '../config/apolloSchema';
import ormconfig from '../../ormconfig.json';
import { ApolloServerContext } from '../ApolloServerContext';

const initApolloServer = async (app: Express) => {
  const db = await createConnection(ormconfig as ConnectionOptions);
  const schema = await buildSchema(apolloScheme);
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }): ApolloServerContext => ({ db, req, res }),
  });
  apolloServer.applyMiddleware({ app });
};

export default initApolloServer;
