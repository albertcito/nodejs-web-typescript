import 'reflect-metadata';
import { Connection } from 'typeorm';
import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema, BuildSchemaOptions } from 'type-graphql';
import path from 'path';

import { ApolloServerContext } from '../ApolloServerContext';
import formatError from '../formatError';

const server = async (app: Express, db: Connection) => {
  const privatePath = path.join(__dirname, '../../../graphql/public/**/*.ts');
  const apolloSchemeOptions: BuildSchemaOptions = {
    resolvers: [privatePath],
    validate: false,
  };
  const apolloSchema = await buildSchema(apolloSchemeOptions);
  const apolloServer = new ApolloServer({
    schema: apolloSchema,
    context: ({ req, res }): ApolloServerContext => ({ db, req, res }),
    formatError,
  });
  apolloServer.applyMiddleware({
    app,
    path: '/graphql/public',
  });
};

export default server;
