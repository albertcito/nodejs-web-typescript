import { join } from 'path';

import ormconfig from './ormconfig';

module.exports = {
  ...ormconfig,
  cli: {
    ...ormconfig.cli,
    seeds: [join(__dirname, '../../db/seeds')],
    factories: [join(__dirname, '../../db/factories')],
  },
};
