// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');
const jestConfig = require('./jest.config');

module.exports = {
  ...jestConfig,
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths ,
    { prefix: '<rootDir>/src' },
  ),
};
