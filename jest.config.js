/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  // coverageProvider: "babel",

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "vue"],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },

  // Automatically reset mock state before every test
  // resetMocks: false,

  // Automatically restore mock state and implementation before every test
  restoreMocks: true,

  // The root directory that Jest should scan for tests and modules within
  // rootDir: undefined,

  // A list of paths to directories that Jest should use to search for files in
  roots: ["<rootDir>/src/", "<rootDir>/tests/"],

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // A map from regular expressions to paths to transformers
  // transform: { "^.+\\.js$": "babel-jest", "^.+\\.vue$": "vue-jest" },

  // Indicates whether each individual test should be reported during the run
  verbose: true,
};
