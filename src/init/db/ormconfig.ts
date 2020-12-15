import { ConnectionOptions } from 'typeorm';
import { join } from 'path';

import { db } from '../../config';

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: db.host,
  port: db.port,
  username: db.user,
  password: db.password,
  database: db.name,
  logging: false,
  entities: [join(__dirname, '../../db/entities/**/*{.ts,.js}')],
  migrations: [join(__dirname, '../../db/migrations/**/*{.ts,.js}')],
  subscribers: [join(__dirname, '../../db/subscribers/**/*{.ts,.js}')],
  cli: {
    entitiesDir: join(__dirname, '../../db/entities'),
    migrationsDir: join(__dirname, '../../db/migrations'),
    subscribersDir: join(__dirname, '../../db/subscribers'),
  },
};

export default ormConfig;
