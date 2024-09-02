const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/src/',
  }),
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx', 'node'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: 'coverage',
};
