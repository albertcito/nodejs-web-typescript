const path = require('path');

const ormconfig = require('./ormconfig');

module.exports = {
  ...ormconfig.default,
  cli: {
    ...ormconfig.default.cli,
    seeds: [path.join(__dirname, '../../db/seeds')],
    factories: [path.join(__dirname, '../../db/factories')],
  },
};
