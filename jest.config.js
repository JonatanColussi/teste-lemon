module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*', '!src/schema.ts'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  transform: {
    '.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
        diagnostics: {
          ignoreCodes: ['TS151001'],
        },
      },
    ],
  },
  roots: ['<rootDir>', 'src'],
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  rootDir: './',
  preset: 'ts-jest',
  testRegex: 'test/.*?\\.(test|spec)\\.tsx?$',
  verbose: false,
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
