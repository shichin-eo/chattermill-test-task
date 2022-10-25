module.exports = {
  roots: ["<rootDir>/src"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["<rootDir>/src/**/*.spec.ts", "<rootDir>/src/**/*.spec.tsx"],
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "<rootDir>/src/**/*.tsx",
    "!**/*.d.ts",
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  coverageReporters: ["html", "text", "text-summary"],
  moduleNameMapper: {
    "\\.(svg|css|less|png)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
