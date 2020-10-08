import { Request, Response } from 'express';
import { Connection } from 'typeorm';

export type ApolloServerContext = {
  db: Connection;
  req: Request;
  res: Response;
}
