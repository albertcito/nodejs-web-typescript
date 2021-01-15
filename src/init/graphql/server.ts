import 'reflect-metadata';
import { Express } from 'express';
import { join } from 'path';
import { BuildSchemaOptions, buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';

import { cors } from 'src/config';
import formatError from './formatError';
import ErrorHandlePlugin from './errorHandlePlugin';

export const path = '/graphql';
const server = async (app: Express) => {
  const privatePath = join(__dirname, '../../graphql/resolvers/**/*{.ts,.js}');
  const apolloSchemeOptions: BuildSchemaOptions = {
    resolvers: [privatePath],
    validate: false,
  };
  const apolloSchema = await buildSchema(apolloSchemeOptions);
  const apolloServer = new ApolloServer({
    schema: apolloSchema,
    formatError,
    plugins: [ErrorHandlePlugin],
    playground: true,
    introspection: true,
    uploads: false,
  });
  apolloServer.applyMiddleware({
    cors,
    app,
    path,
    bodyParserConfig: true,
  });
};

export default server;
