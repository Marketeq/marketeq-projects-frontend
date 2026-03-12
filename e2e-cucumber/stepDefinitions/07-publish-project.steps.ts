import { Given, When, Then, DataTable, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { request as pwRequest } from "@playwright/test";
import SignInPage from '../pages/05-signInPage';
import path from 'path';
import PublishProjectPage from '../pages/07-publishProjectPage';

setDefaultTimeout(180_000);

// __dirname is automatically available in CommonJS mode
const featuredImagePath = path.resolve(__dirname, "../fixtures/avatar.jpg");

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL ?? "http://localhost:3001";
const USER_URL = process.env.NEXT_PUBLIC_USER_URL ?? "http://localhost:3003";
const API_URL= process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";

/**
 * Helper function to get or create PublishProjectPage instance
 */
function getPublishProjectPage(context: any): PublishProjectPage {
  if (!context.publishProject) {
    context.publishProject = new PublishProjectPage(context.page);
  }
  return context.publishProject;
}

/**
 * BACKGROUND STEPS
 */

Given('the Auth and User Services are reachable', async function (this: any) {
  let apiContext = await pwRequest.newContext();
  try {
    await apiContext.get(AUTH_URL, { failOnStatusCode: false, timeout: 10_000 });
    await apiContext.get(USER_URL, { failOnStatusCode: false, timeout: 10_000 });
  } finally {
    await apiContext.dispose();
  }
});

Given('featured image fixture is available for project publishing', async function (this: any) {
  const fs = await import('fs');
  const path = await import('path');
  
  // Create fixtures directory if it doesn't exist
  const fixturesDir = path.dirname(featuredImagePath);
  if (!fs.existsSync(fixturesDir)) {
    fs.mkdirSync(fixturesDir, { recursive: true });
    console.log(`✅ Created fixtures directory: ${fixturesDir}`);
  }
  
  // Create a minimal valid JPEG if the file doesn't exist
  if (!fs.existsSync(featuredImagePath)) {
    // Minimal valid JPEG (1x1 pixel white image)
    const minimalJpeg = Buffer.from([
      0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01,
      0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43,
      0x00, 0x08, 0x06, 0x06, 0x07, 0x06, 0x05, 0x08, 0x07, 0x07, 0x07, 0x09,
      0x09, 0x08, 0x0A, 0x0C, 0x14, 0x0D, 0x0C, 0x0B, 0x0B, 0x0C, 0x19, 0x12,
      0x13, 0x0F, 0x14, 0x1D, 0x1A, 0x1F, 0x1E, 0x1D, 0x1A, 0x1C, 0x1C, 0x20,
      0x24, 0x2E, 0x27, 0x20, 0x22, 0x2C, 0x23, 0x1C, 0x1C, 0x28, 0x37, 0x29,
      0x2C, 0x30, 0x31, 0x34, 0x34, 0x34, 0x1F, 0x27, 0x39, 0x3D, 0x38, 0x32,
      0x3C, 0x2E, 0x33, 0x34, 0x32, 0xFF, 0xC0, 0x00, 0x0B, 0x08, 0x00, 0x01,
      0x00, 0x01, 0x01, 0x01, 0x11, 0x00, 0xFF, 0xC4, 0x00, 0x14, 0x00, 0x01,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x03, 0xFF, 0xC4, 0x00, 0x14, 0x10, 0x01, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0xFF, 0xDA, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3F, 0x00,
      0x7F, 0x80, 0xFF, 0xD9
    ]);
    fs.writeFileSync(featuredImagePath, minimalJpeg);
    console.log(`✅ Created minimal JPEG fixture: ${featuredImagePath}`);
  } else {
    console.log(`✅ Featured image fixture exists: ${featuredImagePath}`);
  }
});


Given('I am on the sign-in page', async function (this: any) {
  const signInPage = new SignInPage(this.page);
  await signInPage.navigateToSignIn();
});

/**
 * SIGN-IN INPUT STEPS
 */

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

/**
 * VERIFICATION STEPS (Data-Driven)
 */

Then('I should see either success or error message for {string}', async function (this: any, scenario: string) {
  const signInPage = new SignInPage(this.page);
  await signInPage.verifySignInResult(scenario);
});

/**
 * NAVIGATION STEPS
 */

When('I navigate to the {string} page', async function (this: any, pageName: string) {
  await getPublishProjectPage(this).navigateToPublishProject();
  await getPublishProjectPage(this).waitForPageLoad();
});

Then('I should see the {string} heading', async function (this: any, headingText: string) {
  await getPublishProjectPage(this).verifyHeading(headingText);
});

/**
 * PROJECT INFO STEP 1
 */

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

/**
 * NAVIGATION BETWEEN STEPS
 */

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

/**
 * MEDIA UPLOAD STEP 2
 */

When('I upload the featured image file', async function (this: any) {
  console.log(`📤 Starting featured image upload...`);
  await getPublishProjectPage(this).uploadFeaturedImage(featuredImagePath);
  
  // Check if there's an "Upload" or "Add Image" button to click after selecting file
  const uploadButton = this.page.getByRole('button', { name: /upload|add image/i });
  const hasButton = await uploadButton.isVisible({ timeout: 2000 }).catch(() => false);
  
  if (hasButton) {
    console.log(`🖱️  Clicking upload confirmation button...`);
    await uploadButton.click();
    await this.page.waitForTimeout(2000);
    console.log(`✅ Upload button clicked`);
  }
  
  console.log(`✅ Featured image upload step completed`);
});

/**
 * PROJECT SCOPE STEP 3
 */

When('I add a project phase', async function (this: any) {
  await getPublishProjectPage(this).addPhase();
});

When('I click Edit Phase Name', async function (this: any) {
  console.log(`🖱️  Clicking phase name button to edit...`);
  
  // Find the phase section and click the phase name button
  const phaseSection = this.page.locator('.group\\/item.rounded-lg.border.border-gray-200').first();
  await phaseSection.waitFor({ state: 'visible', timeout: 10000 });
  
  // Find the button with the phase name (not aria-expanded which is for expand/collapse)
  const phaseNameButton = phaseSection.locator('button[type="button"].text-lg.leading-8.font-semibold').first();
  
  const isVisible = await phaseNameButton.isVisible({ timeout: 2000 }).catch(() => false);
  if (isVisible) {
    await phaseNameButton.click();
  } else {
    // Fallback: find any button in the phase header that's not aria-expanded
    const headerDiv = phaseSection.locator('div.inline-flex').first();
    const buttons = headerDiv.locator('button[type="button"]');
    const buttonCount = await buttons.count();
    let clicked = false;
    for (let i = 0; i < buttonCount; i++) {
      const btn = buttons.nth(i);
      const hasAriaExpanded = await btn.getAttribute('aria-expanded').catch(() => null);
      if (!hasAriaExpanded) {
        const text = await btn.textContent().catch(() => '');
        if (text && text.trim()) {
          await btn.click();
          clicked = true;
          console.log(`✅ Clicked phase name button with text: ${text}`);
          break;
        }
      }
    }
    if (!clicked) {
      throw new Error('Could not find phase name button to click');
    }
  }
  
  // Wait for the edit dialog to appear
  await this.page.waitForTimeout(500);
  const editInput = this.page.locator('input[placeholder*="Phase"], input[name*="phaseName"], input[name*="name"]').first();
  await editInput.waitFor({ state: 'visible', timeout: 10000 });
  
  console.log(`✅ Edit Phase Name dialog opened`);
});

When('I enter phase name as {string}', async function (this: any, phaseName: string) {
  console.log(`✏️  Entering phase name: ${phaseName}`);
  const phaseInput = this.page.locator('input[placeholder*="Phase"], input[name*="phaseName"], input[name*="name"]').first();
  await phaseInput.waitFor({ state: 'visible', timeout: 10000 });
  await phaseInput.clear();
  await phaseInput.fill(phaseName);
  console.log(`✅ Phase name entered`);
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

When('I click Add task for the phase created .', async function (this: any) {
  console.log(`🔘 Clicking Add Task button for the phase...`);
  const addTaskButtons = this.page.locator('button:has-text("Add Task")');
  const count = await addTaskButtons.count();
  
  for (let i = 0; i < count; i++) {
    const button = addTaskButtons.nth(i);
    const isVisible = await button.isVisible().catch(() => false);
    if (isVisible) {
      await button.scrollIntoViewIfNeeded();
      await button.click();
      console.log(`✅ Add Task button clicked`);
      await this.page.waitForTimeout(500);
      return;
    }
  }
  
  throw new Error('No visible Add Task button found');
});

When('I add a project task with name {string}', async function (this: any, taskName: string) {
  console.log(`📋 Adding task: ${taskName}`);
  // Just fill the task name in the dialog - role/location/etc will be set in subsequent steps
  const taskInput = this.page.locator('#task-name');
  const taskDialog = this.page.locator('[role="dialog"]').last();
  
  // Wait for task dialog to be visible
  await taskDialog.waitFor({ state: 'visible', timeout: 10000 });
  await taskInput.waitFor({ state: 'visible', timeout: 10000 });
  await taskInput.clear();
  await taskInput.fill(taskName);
  console.log(`✅ Task name filled: ${taskName}`);
});

When('I select role as {string}', async function (this: any, roleName: string) {
  const roleCell = this.page.getByRole('button', { name: /select role/i }).first();
  const canEditInDialog = await roleCell.isVisible({ timeout: 2000 }).catch(() => false);

  if (canEditInDialog) {
    await roleCell.click();
    const roleOption = this.page
      .locator('[cmdk-item]')
      .filter({ hasText: roleName })
      .first();
    await expect(roleOption).toBeVisible({ timeout: 10000 });
    await roleOption.click();
    await this.page.waitForTimeout(300);
    return;
  }

  // Fallback: task already saved, verify role is present in table row
  await expect(this.page.getByText(roleName, { exact: false }).first()).toBeVisible({ timeout: 10000 });
});

When('I select role as {string} for the task', async function (this: any, roleName: string) {
  console.log(`👤 Selecting role for task: ${roleName}`);
  const taskDialog = this.page.locator('[role="dialog"]').last();
  const roleTrigger = taskDialog.getByRole('button', { name: /select role|frontend developer|backend developer|data scientist/i }).first();
  const isVisible = await roleTrigger.isVisible({ timeout: 2000 }).catch(() => false);

  if (isVisible) {
    await roleTrigger.click();
    await this.page.waitForTimeout(300);
    
    // Use the search input to filter roles
    const roleSearchInput = this.page.getByPlaceholder('Search').last();
    await roleSearchInput.fill(roleName);
    await this.page.waitForTimeout(500);
    
    const roleOption = this.page
      .locator('[cmdk-item]')
      .filter({ hasText: roleName })
      .first();
    await expect(roleOption).toBeVisible({ timeout: 10000 });
    await roleOption.click();
    await this.page.waitForTimeout(300);
    console.log(`✅ Role selected: ${roleName}`);
    return;
  }

  throw new Error(`Role selection button not found or not visible`);
});

When('I select location as {string}', async function (this: any, locationName: string) {
  const locationCell = this.page.getByText('Select country', { exact: false }).first();
  const canEditInDialog = await locationCell.isVisible({ timeout: 2000 }).catch(() => false);

  if (canEditInDialog) {
    await locationCell.click();
    const locationOption = this.page
      .locator('[cmdk-item]')
      .filter({ hasText: locationName })
      .first();
    await expect(locationOption).toBeVisible({ timeout: 10000 });
    await locationOption.click();
    await this.page.waitForTimeout(300);
    return;
  }

  // Fallback: task already saved, verify location is present in table row
  await expect(this.page.getByText(locationName, { exact: false }).first()).toBeVisible({ timeout: 10000 });
});

When('I select location as {string} for the task', async function (this: any, locationName: string) {
  console.log(`🌍 Selecting location for task: ${locationName}`);
  const taskDialog = this.page.locator('[role="dialog"]').last();
  const locationTrigger = taskDialog.getByRole('button', { name: /select country|united states|canada|india|united kingdom/i }).first();
  const isVisible = await locationTrigger.isVisible({ timeout: 2000 }).catch(() => false);

  if (isVisible) {
    await locationTrigger.click();
    await this.page.waitForTimeout(300);
    
    // Use the search input to filter locations
    const locationSearchInput = this.page.getByPlaceholder('Search').last();
    await locationSearchInput.fill(locationName);
    await this.page.waitForTimeout(500);
    
    const locationOption = this.page
      .locator('[cmdk-item]')
      .filter({ hasText: locationName })
      .first();
    await expect(locationOption).toBeVisible({ timeout: 10000 });
    await locationOption.click();
    await this.page.waitForTimeout(300);
    console.log(`✅ Location selected: ${locationName}`);
    return;
  }

  throw new Error(`Location selection button not found or not visible`);
});

When('I select experience level as {string}', async function (this: any, experienceLevel: string) {
  const experienceCell = this.page.getByText('Select experience', { exact: false }).first();
  const canEditInDialog = await experienceCell.isVisible({ timeout: 2000 }).catch(() => false);

  if (canEditInDialog) {
    await experienceCell.click();
    const experienceOption = this.page.getByText(experienceLevel, { exact: false });
    await expect(experienceOption).toBeVisible({ timeout: 10000 });
    await experienceOption.click();
    await this.page.waitForTimeout(300);
    return;
  }

  // Fallback: task already saved. The UI stores "Junior" while step text is "Junior (2 - 3 years)".
  const normalized = experienceLevel.split('(')[0].trim();
  await expect(this.page.getByText(normalized, { exact: false }).first()).toBeVisible({ timeout: 10000 });
});

When('I select experience level as {string} for the task', async function (this: any, experienceLevel: string) {
  console.log(`📊 Selecting experience level for task: ${experienceLevel}`);
  const taskDialog = this.page.locator('[role="dialog"]').last();
  const experienceTrigger = taskDialog.getByRole('button', { name: /select experience|junior|senior|medior|student|guru/i }).first();
  const isVisible = await experienceTrigger.isVisible({ timeout: 2000 }).catch(() => false);

  if (isVisible) {
    await experienceTrigger.click();
    await this.page.waitForTimeout(300);
    const experienceOption = this.page.getByText(experienceLevel, { exact: false });
    await expect(experienceOption).toBeVisible({ timeout: 10000 });
    await experienceOption.click();
    await this.page.waitForTimeout(300);
    console.log(`✅ Experience level selected: ${experienceLevel}`);
    return;
  }

  throw new Error(`Experience level selection button not found or not visible`);
});

When('I set duration as {string} {string}', async function (this: any, value: string, type: string) {
  const durationInput = this.page.locator('input[id="duration"]').or(
    this.page.locator('input[name="duration.value"]')
  );
  const canEditInDialog = await durationInput.first().isVisible({ timeout: 2000 }).catch(() => false);

  if (canEditInDialog) {
    await durationInput.first().clear();
    await durationInput.first().fill(value);
    await this.page.waitForTimeout(300);

    if (type.toLowerCase() !== 'days') {
      const typeButton = this.page.getByRole('button', { name: /days|weeks|hours/i }).first();
      await expect(typeButton).toBeVisible({ timeout: 10000 });
      await typeButton.click();
      await this.page.waitForTimeout(300);

      const typeOption = this.page.getByText(type, { exact: false });
      await expect(typeOption).toBeVisible({ timeout: 5000 });
      await typeOption.click();
      await this.page.waitForTimeout(300);
    }
    return;
  }

  // Fallback: task already saved, verify duration text in table
  const expectedDuration = new RegExp(`${value}\\s*${type}`, 'i');
  await expect(this.page.getByText(expectedDuration).first()).toBeVisible({ timeout: 10000 });
});

When('I select duration as {string} for the task', async function (this: any, durationText: string) {
  console.log(`⏱️  Selecting duration for task: ${durationText}`);
  // Handle format like "1-3 months"
  const taskDialog = this.page.locator('[role="dialog"]').last();
  const durationInput = taskDialog.locator('input[id="duration"], input[name="duration.value"]').first();
  const isVisible = await durationInput.isVisible({ timeout: 2000 }).catch(() => false);

  if (isVisible) {
    // For "1-3 months", extract value and type
    const match = durationText.match(/(\\d+(?:-\\d+)?)\\s+(day|days|week|weeks|month|months|hour|hours)/i);
    if (match) {
      const value = match[1];
      const type = match[2];
      
      await durationInput.clear();
      await durationInput.fill(value);
      await this.page.waitForTimeout(300);

      if (type.toLowerCase() !== 'days') {
        const typeButton = taskDialog.getByRole('button', { name: /days|weeks|months|hours/i }).first();
        await typeButton.click();
        await this.page.waitForTimeout(300);

        const typeOption = this.page.getByText(type, { exact: false });
        await expect(typeOption).toBeVisible({ timeout: 5000 });
        await typeOption.click();
        await this.page.waitForTimeout(300);
      }
      console.log(`✅ Duration set: ${durationText}`);
      return;
    }
  }

  throw new Error(`Duration input not found or invalid format: ${durationText}`);
});

When('I select duration as {string} {string} for the task', async function (this: any, value: string, type: string) {
  console.log(`⏱️  Selecting duration for task: ${value} ${type}`);
  const taskDialog = this.page.locator('[role="dialog"]').last();
  
  // Fill duration value
  const durationInput = taskDialog.locator('input[id="duration"]').first();
  const isInputVisible = await durationInput.isVisible({ timeout: 2000 }).catch(() => false);

  if (!isInputVisible) {
    throw new Error(`Duration input not found or not visible`);
  }

  await durationInput.clear();
  await durationInput.fill(value);
  console.log(`✅ Duration value set to: ${value}`);
  await this.page.waitForTimeout(300);

  // Normalize type to singular form (days -> day, weeks -> week, hours -> hour)
  const singularType = type.toLowerCase().endsWith('s') ? type.slice(0, -1) : type;
  const displayType = singularType.charAt(0).toUpperCase() + singularType.slice(1);
  
  // Only change type if it's not "days" (default)
  if (displayType.toLowerCase() !== 'day') {
    // Find the duration type dropdown button
    const durationTypeButton = taskDialog
      .locator('button')
      .filter({ has: this.page.getByText(/days|weeks|hours/i) })
      .first();
    
    const isButtonVisible = await durationTypeButton.isVisible({ timeout: 2000 }).catch(() => false);
    
    if (isButtonVisible) {
      await durationTypeButton.click();
      await this.page.waitForTimeout(300);
      console.log(`✅ Duration type dropdown opened`);

      // Click the appropriate option
      const typeOption = this.page.getByRole('menuitem').filter({ hasText: new RegExp(displayType, 'i') }).first();
      const hasOption = await typeOption.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (hasOption) {
        await typeOption.click();
        console.log(`✅ Duration type selected: ${displayType}`);
      } else {
        // Try alternative selector
        const altOption = this.page.getByText(displayType, { exact: false }).first();
        await altOption.click();
        console.log(`✅ Duration type selected: ${displayType}`);
      }
      await this.page.waitForTimeout(300);
    }
  }
  
  console.log(`✅ Duration set: ${value} ${type}`);
});

/**
 * VERIFICATION STEPS
 */

Then('I should see the success message {string}', async function (this: any, message: string) {
  console.log(`✅ Verifying success message: "${message}"`);
  console.log(`📍 Current URL: ${await getPublishProjectPage(this).getPageUrl()}`);
  
  // Wait for page to stabilize after submission
  await this.page.waitForLoadState('networkidle').catch(() => {});
  await this.page.waitForTimeout(2000);
  
  // Check page content for debugging
  const pageTitle = await this.page.title().catch(() => 'N/A');
  const pageUrl = this.page.url();
  console.log(`📄 Page Title: ${pageTitle}`);
  console.log(`🔗 Page URL: ${pageUrl}`);
  
  // Look for error messages first
  const errorPatterns = ['error', 'failed', 'unauthorized', '401', '403'];
  for (const pattern of errorPatterns) {
    const errorElement = this.page.locator(`text=${pattern}`).first();
    const isVisible = await errorElement.isVisible({ timeout: 1000 }).catch(() => false);
    if (isVisible) {
      const errorText = await errorElement.innerText().catch(() => pattern);
      console.error(`❌ Found error message: ${errorText}`);
      throw new Error(`Submission error detected: ${errorText}`);
    }
  }
  
  // Look for success message
  const successMessage = this.page.getByText(message);
  const partialMessage = this.page.getByText(message, { exact: false });
  
  try {
    await expect(successMessage.or(partialMessage)).toBeVisible({ timeout: 20000 });
    console.log(`✅ Success message found!`);
  } catch (error) {
    // Fallback: look for any text containing key success phrases
    const allText = await this.page.innerText('body').catch(() => '');
    if (allText.toLowerCase().includes('submitted')) {
      console.log(`✅ Found "submitted" text in page`);
      return;
    }
    throw new Error(`Success message "${message}" not found. Page content: ${allText.substring(0, 500)}`);
  }
});

Then('I should see the message {string}', async function (this: any, messageText: string) {
  const message = this.page.getByText(new RegExp(messageText, 'i'));
  await expect(message).toBeVisible({ timeout: 20000 });
});


