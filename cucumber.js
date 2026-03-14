process.env.TS_NODE_PROJECT = "tests/tsconfig.json"

const sharedConfig = {
  requireModule: ["tsconfig-paths/register", "ts-node/register"],
  require: [
    "tests/common/**/*.ts",
    "tests/helpers/**/*.ts",
    "tests/hooks/**/*.ts",
    "tests/pages/commonPage.ts",
    "tests/steps/common.steps.ts",
  ],
  formatOptions: { snippetInterface: "async-await" },
  publishQuiet: true,
  failFast: false,
  retry: 0,
  timeout: 60000,
}

module.exports = {
  // runs @smoke tests only: npx cucumber-js
  default: {
    ...sharedConfig,
    require: [
      ...sharedConfig.require,
      "tests/pages/**/*.ts",
      "tests/steps/**/*.ts",
    ],
    paths: ["tests/features/**/*.feature"],
    tags: "@smoke and not @ignore",
    format: ["progress", "html:tests/reports/default.html"],
  },

  // runs all tests: npx cucumber-js --profile all
  all: {
    ...sharedConfig,
    require: [
      ...sharedConfig.require,
      "tests/pages/**/*.ts",
      "tests/steps/**/*.ts",
    ],
    paths: ["tests/features/**/*.feature"],
    tags: "not @ignore",
    parallel: 2,
    format: [
      "progress",
      "html:tests/reports/all.html",
      "json:tests/reports/all.json",
    ],
  },

  // runs authentication tests: npx cucumber-js --profile authentication
  authentication: {
    ...sharedConfig,
    require: [
      ...sharedConfig.require,
      "tests/pages/authentication/*.ts",
      "tests/steps/authentication/*.ts",
    ],
    paths: ["tests/features/authentication/*.feature"],
    tags: "not @ignore",
    format: [
      "progress",
      "html:tests/reports/authentication.html",
      "json:tests/reports/authentication.json",
    ],
  },

  // runs complete-my-profile tests: npx cucumber-js --profile completeProfile
  completeProfile: {
    ...sharedConfig,
    require: [
      ...sharedConfig.require,
      "tests/pages/complete-my-profile/*.ts",
      "tests/steps/complete-my-profile/*.ts",
    ],
    paths: ["tests/features/complete-my-profile/*.feature"],
    tags: "not @ignore",
    format: [
      "progress",
      "html:tests/reports/complete-profile.html",
      "json:tests/reports/complete-profile.json",
    ],
  },

  // runs publishProject tests: npx cucumber-js --profile publishProject
  publishProject: {
    ...sharedConfig,
    require: [
      ...sharedConfig.require,
      "tests/pages/publish-project/*.ts",
      "tests/steps/publish-project/*.ts",
    ],
    paths: ["tests/features/publish-project/*.feature"],
    tags: "not @ignore",
    format: [
      "progress",
      "html:tests/reports/publish-project.html",
      "json:tests/reports/publish-project.json",
    ],
  },
}
