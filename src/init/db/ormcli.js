const path = require('path');

const connectionOptions = require('./connectionOptions');
/**
 * Only used for local CLI
 * For PROD is used the compiled file ./connectionOptions.js
 */
module.exports = {
  ...connectionOptions.default,
  cli: {
    ...connectionOptions.default.cli,
    seeds: [path.join(__dirname, '../../db/seeds')],
    factories: [path.join(__dirname, '../../db/factories')],
  },
};
