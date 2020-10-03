import 'reflect-metadata';
import { Connection } from 'typeorm';

import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import apolloScheme from '../config/apolloSchema';
import { ApolloServerContext } from '../ApolloServerContext';

const initApolloServer = async (app: Express, db: Connection) => {
  const schema = await buildSchema(apolloScheme);
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }): ApolloServerContext => ({ db, req, res }),
  });
  apolloServer.applyMiddleware({ app });
};

export default initApolloServer;
