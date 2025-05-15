/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text-summary'],
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^./middlewares/expressjwt.config$': '<rootDir>/__mocks__/expressjwt.config.ts'
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
};