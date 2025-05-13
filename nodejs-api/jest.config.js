/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
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