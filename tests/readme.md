## Installation & Setup

### Install Cucumber and Playwright

```bash
npm install --save-dev @cucumber/cucumber @playwright/test
```

### Install Playwright Browser

```bash
npm exec playwright install
```

### Install TypeScript Node and Paths

```bash
npm install --save-dev ts-node tsconfig-paths
```

### Clean Build Cache (if needed)

```bash
rm -rf .next
npm run dev
```

### Updating `cucumber.js` for New Feature Tests

To add new feature test profiles in `cucumber.js`:

1. **Create Feature Files & Steps**
   - Add your `.feature` files under `tests/features/<feature-name>/`.
   - Add step definitions under `tests/steps/<feature-name>/`.
   - Add page objects under `tests/pages/<feature-name>/`.

2. **Add a New Profile**  
   In `cucumber.js`, copy an existing profile and update:
   - `require`: Add paths to your new steps/pages.
   - `paths`: Point to your new feature files.
   - `format`: Set report output filenames.
   - `tags`: Use `not @ignore` to run all, or specify tags.

   Example:

   ```javascript
   // filepath: cucumber.js
   customProfile: {
     ...sharedConfig,
     require: [
       ...sharedConfig.require,
       "tests/pages/new-feature/*.ts",
       "tests/steps/new-feature/*.ts",
     ],
     paths: ["tests/features/new-feature/*.feature"],
     tags: "not @ignore",
     format: [
       "progress",
       "html:tests/reports/new-feature.html",
       "json:tests/reports/new-feature.json",
     ],
   },
   ```

3. **Run the Profile**

```bash
   npx cucumber-js                            // dafault: runs only Smoke tests
   npx cucumber-js --profile customeProfile   // runs only customProfile tests
   npx cucumber-js --profile all              // runs all profiles
```

> **Note:**  
> The `default` profile is for smoke tests (`@smoke and not @ignore`).  
> Update tags as needed for your test selection.

### Running tests in headed mode

# Headed — browser visible (default)

```bash
npx cucumber-js --profile completeProfile
```

# Headless — no browser window (for CI/CD)

```bash
HEADED=false npx cucumber-js --profile completeProfile
```

## Gherkin Syntax

Feature files use Gherkin keywords:

- Feature: High-level description of the functionality
- Background: Steps that run before each scenario
- Scenario: Individual test case
- Given: Initial context/preconditions
- When: Action/event that triggers behavior
- Then: Expected outcome/assertion
- And: Additional steps (same level as previous keyword)

## Environment Configuration

Required environment variables in .env file:

```env
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3002
NEXT_PUBLIC_AUTH_URL=http://localhost:3001
NEXT_PUBLIC_USER_URL=http://localhost:3003
```

Optional test-specific variables:

```bash
# Google OAuth testing
GOOGLE_TEST_EMAIL=your-test-email@gmail.com
GOOGLE_TEST_PASSWORD=your-password
```

## Folder Structure

```
marketeq-projects-frontend/
└── tests/
    ├── common/
    │   └── logger.ts
    ├── features/
    │   ├── authentication/
    │   └── complete-my-profile/
    ├── fixtures/
    │   └── photo.jpg
    ├── helpers/
    │   └── loginHelper.ts
    ├── hooks/
    │   └── hooks.ts
    ├── pages/
    │   ├── authentication/
    │   │   ├── signInPage.ts
    │   │   └── signUpPage.ts
    │   ├── complete-my-profile/
    │   └── commonPage.ts
    ├── reports/
    ├── steps/
    │   ├── authentication/
    │   │   ├── sign-in.steps.ts
    │   │   └── sign-up.steps.ts
    │   ├── complete-my-profile/
    │   │   └── complete-my-profile.steps.ts
    │   └── common.steps.ts
    ├── README.md
    └── tsconfig.json
```

## Resources

- Cucumber Documentation
- Playwright Documentation
- Gherkin Reference
- BDD Best Practices
