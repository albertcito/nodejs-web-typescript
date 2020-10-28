import 'reflect-metadata';
import { Connection } from 'typeorm';
import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { HttpQueryError } from 'apollo-server-core';
import { buildSchema, BuildSchemaOptions } from 'type-graphql';
import path from 'path';

import { ApolloServerContext } from '../ApolloServerContext';
import formatError from '../formatError';
import AuthenticationError from '../../../util/exceptions/AuthenticationError';

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
    plugins: [HttpStatus403Plugin],
  });
  apolloServer.applyMiddleware({
    app,
    path: '/graphql/public',
  });
};

export default server;
