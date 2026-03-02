//RUNNER FILE FOR CUCUMBER TESTS
module.exports = {
  // ── default has NO paths — only shared config ──────────────────────────
  default: {
    requireModule: ["ts-node/register"],
    require: ["tests/stepDefinitions/**/*.steps.ts", "tests/stepDefinitions/hooks.ts"],
    formatOptions: { snippetInterface: "async-await" },
    publishQuiet: true,
    parallel: 1,
  },

  // ── email signup with password ─────────────────────────────────────────
  emailsignup: {
    requireModule: ["ts-node/register"],
    require: [
      "e2e-cucumber/stepDefinitions/common.steps.ts",
      "e2e-cucumber/stepDefinitions/02-signup-email-setpassword.steps.ts",
      "e2e-cucumber/stepDefinitions/hooks.ts"
    ],
    paths: ["e2e-cucumber/features/02-signup-email-setpassword.feature"],
    format: [
      "progress",
      "html:reports/signup-email-setpassword.html",
      "json:reports/signup-email-setpassword.json",
    ],
    formatOptions: { snippetInterface: "async-await" },
    publishQuiet: true,
  },

  // ── google signup ─────────────────────────────────────────────────────
  googlesignup: {
    requireModule: ["ts-node/register"],
    require: [
      "e2e-cucumber/stepDefinitions/common.steps.ts",
      "e2e-cucumber/stepDefinitions/04-google-signup-signin.steps.ts",
      "e2e-cucumber/stepDefinitions/hooks.ts"
    ],
    paths: ["e2e-cucumber/features/04-google-signup-signin.feature"],
    format: [
      "progress",
      "html:reports/google-signup.html",
      "json:reports/google-signup.json",
    ],
    formatOptions: { snippetInterface: "async-await" },
    publishQuiet: true,
  },

  // ── publish project ────────────────────────────────────────────────────
  publishproject: {
    requireModule: ["ts-node/register"],
    require: [
      "e2e-cucumber/stepDefinitions/common.steps.ts",
      "e2e-cucumber/stepDefinitions/publish-project.steps.ts",
      "e2e-cucumber/stepDefinitions/hooks.ts"
    ],
    paths: ["e2e-cucumber/features/publish-project.feature"],
    format: [
      "progress",
      "html:reports/publish-project.html",
      "json:reports/publish-project.json",
    ],
    formatOptions: { snippetInterface: "async-await" },
    publishQuiet: true,
  },

  // ── login user pwd (e2e-cucumber) ─────────────────────────────────────
  loginuserpwd: {
    requireModule: ["ts-node/register"],
    require: [
      "e2e-cucumber/stepDefinitions/common.steps.ts",
      "e2e-cucumber/stepDefinitions/02-signup-email-setpassword.steps.ts",
      "e2e-cucumber/stepDefinitions/hooks.ts"
    ],
    paths: ["e2e-cucumber/features/03-login-user-pwd.feature"],
    format: [
      "progress",
      "html:reports/login-user-pwd.html",
      "json:reports/login-user-pwd.json",
    ],
    formatOptions: { snippetInterface: "async-await" },
    publishQuiet: true,
  },

  // ── all features ───────────────────────────────────────────────────────
  all: {
    requireModule: ["ts-node/register"],
    require: ["tests/stepDefinitions/**/*.steps.ts", "tests/stepDefinitions/hooks.ts"],
    paths: ["tests/features/**/*.feature"],
    format: [
      "progress",
      "html:reports/all-features.html",
      "json:reports/all-features.json",
    ],
    formatOptions: { snippetInterface: "async-await" },
    publishQuiet: true,
  },
};