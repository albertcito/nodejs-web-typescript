import 'reflect-metadata';
import { Connection } from 'typeorm';
import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema, BuildSchemaOptions } from 'type-graphql';
import { join } from 'path';

import { ApolloServerContext } from '../ApolloServerContext';
import formatError from '../formatError';
import { cors } from '../../../config';
import ErrorHandlePlugin from './errorHandlePlugin';

export const path = '/graphql/public';
const server = async (app: Express, db: Connection) => {
  const privatePath = join(__dirname, '../../../graphql/public/**/*.ts');
  const apolloSchemeOptions: BuildSchemaOptions = {
    resolvers: [privatePath],
    validate: false,
  };
  const apolloSchema = await buildSchema(apolloSchemeOptions);
  const apolloServer = new ApolloServer({
    schema: apolloSchema,
    context: ({ req, res }): ApolloServerContext => ({ db, req, res }),
    formatError,
    plugins: [ErrorHandlePlugin],
  });
  apolloServer.applyMiddleware({
    cors,
    app,
    path,
  });
};

export default server;
