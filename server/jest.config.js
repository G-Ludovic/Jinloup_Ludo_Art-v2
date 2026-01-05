// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "node",
// };

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
  testMatch: ["**/tests/**/*.ts"], // là où tes tests sont
};
