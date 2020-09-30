import 'reflect-metadata';
import { ConnectionOptions } from "typeorm";
import {createConnection} from "typeorm";
import ormconfig from '../ormconfig.json';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { apolloScheme } from './config/apolloSchema';
import session from 'express-session';
import { redisSession } from './config/redisSession';
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
    console.log("Server started at localhost:4000");
  });
}

main();