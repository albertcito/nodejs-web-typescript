// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  preset: 'ts-jest',
  roots: [
    "build/tests"
  ],
  testEnvironment: "node",
};
