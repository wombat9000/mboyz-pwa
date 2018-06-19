module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  setupTestFrameworkScriptFile: '<rootDir>/src/setup-jest.ts'
};

//
// "jest": {
//   "moduleFileExtensions": [
//     "ts",
//     "html",
//     "js",
//     "json"
//   ],
//     "transform": {
//     "^.+\\.(tsx?|html)$": "ts-jest",
//       "^.+\\.(ts|tsx)$": "ts-jest"
//   },
//   "globals": {
//     "__TRANSFORM_HTML__": true,
//       "ts-jest": {
//       "tsConfigFile": "tsconfig.json"
//     }
//   },
//   "testMatch": [
//     "<rootDir>/src/**/*.+(spec.ts)"
//   ],
//     "setupTestFrameworkScriptFile": "<rootDir>/src/setupJestTestFramework.ts"
// }
