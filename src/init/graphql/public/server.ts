import 'reflect-metadata';
import { Connection } from 'typeorm';
import { Express } from 'express';
import { join } from 'path';
import { BuildSchemaOptions, buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';

import { ApolloServerContext } from '../ApolloServerContext';
import formatError from '../formatError';
import ErrorHandlePlugin from './errorHandlePlugin';
import { cors } from '../../../config';

export const path = '/graphql';
const server = async (app: Express, db: Connection) => {
  const privatePath = join(__dirname, '../../../graphql/resolvers/**/*{.ts,.js}');
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
    playground: true,
    introspection: true,
  });
  apolloServer.applyMiddleware({
    cors,
    app,
    path,
  });
};

export default server;
