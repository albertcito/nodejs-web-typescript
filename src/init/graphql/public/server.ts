import 'reflect-metadata';
import { Connection } from 'typeorm';
import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { HttpQueryError } from 'apollo-server-core';
import { buildSchema, BuildSchemaOptions } from 'type-graphql';
import { join } from 'path';

import { ApolloServerContext } from '../ApolloServerContext';
import formatError from '../formatError';
import AuthenticationError from '../../../util/exceptions/AuthenticationError';

// I tried to do it like the Apollo test, but its doen's works
// https://github.com/apollographql/apollo-server/blob/1af2792ed9e18f2bf218a29c2f4f128b6588f9ca/packages/apollo-server-integration-testsuite/src/ApolloServer.ts#L661
const HttpStatus403Plugin: ApolloServerPlugin = {
  requestDidStart() {
    return {
      willSendResponse(requestContext) {
        // eslint-disable-next-line no-restricted-syntax
        for (const { originalError } of requestContext.errors || []) {
          if (originalError instanceof AuthenticationError) {
            throw new HttpQueryError(403, originalError.message, false);
          }
        }
      },
    };
  },
};

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
    plugins: [HttpStatus403Plugin],
  });
  apolloServer.applyMiddleware({
    app,
    path,
  });
};

export default server;
