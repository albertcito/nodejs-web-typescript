import getApp from './init/app';

const main = async () => {
  const app = await getApp();
  app.listen(4000, () => {
    // eslint-disable-next-line no-console
    console.info('Server started at localhost:4000');
  });
};

main();
