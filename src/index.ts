import getServer from './init/server';

const main = async () => {
  const server = await getServer();
  server.listen(4000, () => {
    // eslint-disable-next-line no-console
    console.info('Server started at localhost:4000');
  });
};

main();
