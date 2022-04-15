/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  transform: {
    "^.+\\.tsx?$": ["esbuild-jest", { sourcemap: true }],
  },
  collectCoverage: true,
  testEnvironment: "node",
};
