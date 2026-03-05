# Cucumber BDD Testing Framework

## Overview
This directory contains end-to-end Cucumber/BDD tests using Playwright.

## Project Structure
```text
marketeq-projects-frontend/
|-- cucumber.js                  # Cucumber profiles/configuration
`-- e2e-cucumber/
    |-- features/                # Gherkin feature files
    |-- stepDefinitions/         # Cucumber step definitions
    |-- hooks/                   # Before/After hooks
    |-- common/                  # Shared steps/helpers
    |-- pages/                   # Page Object Model classes
    |-- fixtures/                # Test assets
    `-- readme.md
```

## Active Profiles
Configured in `cucumber.js`:
- `talentOnboarding` -> `02-signup-email-setpassword.feature`
- `googleSignupSignin` -> `04-google-signup-signin.feature`
- `datadrivenSignin` -> `05-signin-datadriven-test.feature`
- `publishProject` -> `07-publish-project.feature`
- `all` -> runs only the four profiles above

## Running Tests

### npm scripts (recommended)
```bash
npm run test:talentOnboarding
npm run test:googleSignupSignin
npm run test:datadrivenSignin
npm run test:publishProject
npm run test:all
```

### Cucumber CLI
```bash
# Single profile
npx cucumber-js --profile talentOnboarding
npx cucumber-js --profile googleSignupSignin
npx cucumber-js --profile datadrivenSignin
npx cucumber-js --profile publishProject

# Run all selected features
npx cucumber-js --profile all
```

### Headed mode (PowerShell)
```powershell
$env:HEADLESS='false'; npm run test:talentOnboarding
$env:HEADLESS='false'; npm run test:googleSignupSignin
$env:HEADLESS='false'; npm run test:datadrivenSignin
$env:HEADLESS='false'; npm run test:publishProject
```

## Reports
Reports are generated in `reports/`:
- `signup-email-setpassword.html/.json`
- `google-signup.html/.json`
- `signin-datadriven-test.html/.json`
- `publish-project.html/.json`
- `selected-features.html/.json` (for `test:all`)

## Environment Variables
Example values:
```env
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3002
NEXT_PUBLIC_AUTH_URL=http://localhost:3001
NEXT_PUBLIC_USER_URL=http://localhost:3003
```

Optional for tests:
```env
HEADLESS=false
GOOGLE_TEST_EMAIL=your-test-email@gmail.com
GOOGLE_TEST_PASSWORD=your-password
```

## Add a New Test Profile
1. Add a feature file under `e2e-cucumber/features/`.
2. Add step definitions under `e2e-cucumber/stepDefinitions/`.
3. Add a new profile in `cucumber.js`.
4. Add matching npm script in `package.json`.

## References
- https://cucumber.io/docs/cucumber/
- https://playwright.dev/
- https://cucumber.io/docs/gherkin/reference/
