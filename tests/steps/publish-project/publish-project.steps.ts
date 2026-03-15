// Ensure BASE_URL is set before any imports that might use it
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL ?? "http://localhost:3001";
const USER_URL = process.env.NEXT_PUBLIC_USER_URL ?? "http://localhost:3003";
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";

console.log('DEBUG publish-project.steps.ts - Environment check:');
console.log('  BASE_URL:', BASE_URL);
console.log('  AUTH_URL:', AUTH_URL);
console.log('  USER_URL:', USER_URL);
console.log('  API_URL:', API_URL);

import { Given, When, Then, DataTable, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SignInPage } from '../../pages/authentication/signInPage';
import path from 'path';
import { PublishProjectPage } from '../../pages/publish-project/publishProjectPage';

setDefaultTimeout(180_000);

const featuredImagePath = path.resolve(__dirname, "../fixtures/avatar.jpg");

/**
 * Helper function to get or create PublishProjectPage instance
 */
function getPublishProjectPage(context: any): PublishProjectPage {
  if (!context.publishProject) {
    context.publishProject = new PublishProjectPage(context.page);
  }
  return context.publishProject;
}

// =============================
// BACKGROUND STEPS
// =============================

Given('featured image fixture is available for project publishing', async function (this: any) {
  const fs = await import('fs');
  const path = await import('path');
  
  const fixturesDir = path.dirname(featuredImagePath);
  if (!fs.existsSync(fixturesDir)) {
    fs.mkdirSync(fixturesDir, { recursive: true});
    console.log(`✅ Created fixtures directory: ${fixturesDir}`);
  } 
});

Given('I am on the sign-in page', async function (this: any) {
  const signInPage = new SignInPage(this.page);
  await signInPage.navigateToSignIn();
});

// =============================
// SIGN-IN STEPS **
// =============================

When('I enter email as {string}', async function (this: any, email: string) {
  const signInPage = new SignInPage(this.page);
  await signInPage.enterEmail(email);
});

When('I enter password as {string}', async function (this: any, password: string) {
  const signInPage = new SignInPage(this.page);
  await signInPage.enterPassword(password);
});

When('I click the sign-in button', async function (this: any) {
  const signInPage = new SignInPage(this.page);
  await signInPage.clickSignInButton();
});

Then('I am successfully signed in and navigated to the talent dashboard page', async function (this: any) {
  await this.page.waitForURL(/dashboard/, { timeout: 10000 });
  await expect(this.page.url()).toMatch(/dashboard/);
});

// =============================
// NAVIGATION STEPS **
// =============================

When('I click the "Create a Project" button in Create Your Own Projects', async function (this: any) {
  await getPublishProjectPage(this).clickCreateProjectButton();
});

When('I am successfully navigated to {string} page', async function (this: any, pageName: string) {
  await getPublishProjectPage(this).verifyPublishProjectPage();
});

Then('I should see the {string} heading', async function (this: any, headingText: string) {
  await getPublishProjectPage(this).verifyHeading(headingText);
});

// =============================
// STEP 1: PROJECT INFO **
// =============================

When('I fill the project title as {string}', async function (this: any, title: string) {
  await getPublishProjectPage(this).fillProjectTitle(title);
});

When('I select project categories:', async function (this: any, dataTable: DataTable) {
  const categories = dataTable.raw().flat();
  await getPublishProjectPage(this).selectCategories(categories);
});

When('I add project sub-categories:', async function (this: any, dataTable: DataTable) {
  const subCategories = dataTable.raw().flat();
  await getPublishProjectPage(this).addSubCategories(subCategories);
});

When('I fill the project short description', async function (this: any) {
  await getPublishProjectPage(this).fillShortDescription(
    'This short description is long enough for validation and test coverage.'
  );
});

When('I fill the project full description', async function (this: any) {
  await getPublishProjectPage(this).fillFullDescription(
    'This full description is intentionally long enough to satisfy validation rules. It confirms text entry works on the publish project page.'
  );
});

When('I add project tags:', async function (this: any, dataTable: DataTable) {
  const rows = dataTable.raw();
  
  for (const [fieldKey, value] of rows) {
    const fieldName = fieldKey?.toLowerCase() || '';
    
    if (fieldName.includes('industri')) {
      await getPublishProjectPage(this).addIndustries([value]);
    } else if (fieldName.includes('tag')) {
      await getPublishProjectPage(this).addTags([value]);
    } else if (fieldName.includes('skill')) {
      await getPublishProjectPage(this).addSkills([value]);
    }
  }
});

// =============================
// STEP NAVIGATION **
// =============================

When('I click the {string} button on publish form', async function (this: any, buttonText: string) {
  if (buttonText.toLowerCase() === 'next') {
    await getPublishProjectPage(this).clickNextButton();
  } else if (buttonText.toLowerCase() === 'back' || buttonText.toLowerCase() === 'previous') {
    await getPublishProjectPage(this).clickBackButton();
  } else if (buttonText.toLowerCase() === 'done') {
    await getPublishProjectPage(this).clickDoneButton();
  } else if (buttonText.toLowerCase() === 'submit project') {
    await getPublishProjectPage(this).submitProject();
  } else {
    throw new Error(`Unknown button: ${buttonText}`);
  }
});

// =============================
// STEP 2: MEDIA UPLOAD **
// =============================

When('I upload the featured image file', async function (this: any) {
  await getPublishProjectPage(this).uploadFeaturedImage(featuredImagePath);
});

// =============================
// STEP 3: PROJECT SCOPE 
// =============================

When('I add a project phase', async function (this: any) {
  await getPublishProjectPage(this).addPhase();
});

When('I click Edit Phase Name', async function (this: any) {
  await getPublishProjectPage(this).clickEditPhaseNameButton();  
});

When('I enter phase name as {string}', async function (this: any, phaseName: string) {
  await getPublishProjectPage(this).fillPhaseNameInput(phaseName);  
});

When('I click Done in the phase dialog', async function (this: any) {
  await getPublishProjectPage(this).clickDoneInPhaseDialog();
});

When('I add a project task with name {string} for the phase', async function (this: any, taskName: string) {
  await getPublishProjectPage(this).addTask({
    taskName,
    role: 'Frontend Developer',
    location: 'United States',
    experience: 'frontend',
    experienceLevel: 'Junior',
    duration: '5 days',
  });
});

When('I add a project phase with name {string}', async function (this: any, phaseName: string) {
  await getPublishProjectPage(this).addPhase();
  await getPublishProjectPage(this).editPhaseName(phaseName);
  await getPublishProjectPage(this).clickDoneInPhaseDialog();
});

// =============================
// TASK-RELATED STEPS 
// =============================

When('I click Add task for the phase created .', async function (this: any) {
  await getPublishProjectPage(this).clickAddTaskButton();
});

When('I add a project task with name {string}', async function (this: any, taskName: string) {
  await getPublishProjectPage(this).fillTaskName(taskName);
});

When('I select role as {string}', async function (this: any, roleName: string) {
  await getPublishProjectPage(this).selectTaskRole(roleName);
});

When('I select role as {string} for the task', async function (this: any, roleName: string) {
  await getPublishProjectPage(this).selectTaskRole(roleName);
});

When('I select location as {string}', async function (this: any, locationName: string) {
  await getPublishProjectPage(this).selectTaskLocation(locationName);
});

When('I select location as {string} for the task', async function (this: any, locationName: string) {
  await getPublishProjectPage(this).selectTaskLocation(locationName);
});

When('I select experience level as {string}', async function (this: any, experienceLevel: string) {
  await getPublishProjectPage(this).selectTaskExperience(experienceLevel);
});

When('I select experience level as {string} for the task', async function (this: any, experienceLevel: string) {
  await getPublishProjectPage(this).selectTaskExperience(experienceLevel);
});

When('I set duration as {string} {string}', async function (this: any, value: string, type: string) {
  await getPublishProjectPage(this).selectTaskDurationValueAndType(value, type);
});

When('I select duration as {string} for the task', async function (this: any, durationText: string) {
  await getPublishProjectPage(this).selectTaskDuration(durationText);
});

When('I select duration as {string} {string} for the task', async function (this: any, value: string, type: string) {
  await getPublishProjectPage(this).selectTaskDurationValueAndType(value, type);
});

// =============================
// VERIFICATION STEPS (POM)
// =============================

Then('I should see the success message {string}', async function (this: any, message: string) {
  await getPublishProjectPage(this).verifySuccessMessage(message);
});

Then('I should see the message {string}', async function (this: any, messageText: string) {
  await getPublishProjectPage(this).verifyMessage(messageText);
});

// =============================
// HOME NAVIGATION 
// =============================

When('I click "Go to Home" button', async function (this: any) {
  await getPublishProjectPage(this).clickGoHomeButton();
});

Then('I should be navigated to marketeq digital home page', async function (this: any) {
  await getPublishProjectPage(this).verifyOnHomePage();
});
