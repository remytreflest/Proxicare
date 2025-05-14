/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/models/User$': '<rootDir>/__mocks__/models/User.ts',
    '^./middlewares/expressjwt.config$': '<rootDir>/__mocks__/expressjwt.config.ts'
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
};