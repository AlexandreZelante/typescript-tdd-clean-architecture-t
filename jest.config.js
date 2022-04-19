module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest", // Convert all TS tests to JS
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
