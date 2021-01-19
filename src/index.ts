import { createConnection } from 'typeorm';

import getServer from './init/server';
import connectionOptions from './init/db/connectionOptions';

const port = process.env.PORT ?? 5000;
const main = async () => {
  await createConnection(connectionOptions);
  const server = await getServer();
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.info(`Server started at localhost:${port}`);
  });
};

main();
