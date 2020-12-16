import { ConnectionOptions, createConnection } from 'typeorm';

import getServer from './init/server';
import ormconfig from './init/db/ormconfig';

const port = process.env.PORT || 5000;
const main = async () => {
  // db conection
  const db = await createConnection(ormconfig as ConnectionOptions);
  const server = await getServer(db);
  server.listen(port || 5000, () => {
    // eslint-disable-next-line no-console
    console.info(`Server started at localhost:${port}`);
  });
};

main();
