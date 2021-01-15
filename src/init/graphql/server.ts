import 'reflect-metadata';
import { join } from 'path';
import { BuildSchemaOptions, buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';

import formatError from './formatError';
import ErrorHandlePlugin from './errorHandlePlugin';

export const path = '/graphql';
const server = async () => {
  const privatePath = join(__dirname, '../../graphql/resolvers/**/*{.ts,.js}');
  const apolloSchemeOptions: BuildSchemaOptions = {
    resolvers: [privatePath],
    validate: false,
  };
  const apolloSchema = await buildSchema(apolloSchemeOptions);
  return new ApolloServer({
    schema: apolloSchema,
    formatError,
    plugins: [ErrorHandlePlugin],
    playground: true,
    introspection: true,
    uploads: false,
  });
};

export default server;
