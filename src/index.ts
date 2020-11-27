import getServer from './init/server';

const port = process.env.PORT || 5000;
const main = async () => {
  const server = await getServer();
  server.listen(port || 5000, () => {
    // eslint-disable-next-line no-console
    console.info(`Server started at localhost:${port}`);
  });
};

main();
