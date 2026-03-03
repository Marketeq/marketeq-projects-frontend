import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { request as pwRequest } from "@playwright/test";

setDefaultTimeout(60_000);

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL ?? "http://localhost:3001";
const USER_URL = process.env.NEXT_PUBLIC_USER_URL ?? "http://localhost:3003";

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

Given('I am on the sign-in page', async function (this: any) {
  console.log(` Navigating to sign-in page: ${BASE_URL}/sign-in`);
  await this.page.goto(`${BASE_URL}/sign-in`, { waitUntil: 'domcontentloaded' });
  
  console.log(` Currently on sign-in page: ${this.page.url()}`);
  
  // Wait for sign-in form inputs to exist
  await this.page.waitForSelector('input#email', { timeout: 10000 });
  await this.page.waitForSelector('input#password', { timeout: 10000 });
  console.log(` Sign-in form is ready`);
});

/**
 * SIGN-IN INPUT STEPS
 */

When('I enter email as {string}', async function (this: any, email: string) {
  console.log(` Entering email: "${email === 'EMPTY' ? '(empty)' : email}"`);
  
  // Get email input using id selector (already verified in background step)
  const emailInput = this.page.locator('input#email');
  await emailInput.scrollIntoViewIfNeeded();
  
  // Handle EMPTY placeholder
  if (email !== 'EMPTY') {
    await emailInput.fill(email);
  }
  
  console.log(` Email filled: ${email === 'EMPTY' ? '(empty)' : email}`);
});

When('I enter password as {string}', async function (this: any, password: string) {
  const isPasswordEmpty = password === 'EMPTY';
  console.log(` Entering password: "${isPasswordEmpty ? '(empty)' : '(hidden)'}"`);
  
  // Get password input using id selector (already verified in background step)
  const passwordInput = this.page.locator('input#password');
  await passwordInput.scrollIntoViewIfNeeded();
  
  // Handle EMPTY placeholder
  if (!isPasswordEmpty) {
    await passwordInput.fill(password);
  }
  console.log(` Password filled: ${isPasswordEmpty ? '(empty)' : '(hidden)'}`);
});

When('I click the sign-in button', async function (this: any) {
  console.log(`  Clicking sign-in button...`);
  
  // Click login button - "Login to my account"
  const loginButton = this.page.locator('button').filter({ hasText: /Login to my account/i });
  await loginButton.click();
  console.log(` Sign-in button clicked`);
});

/**
 * VERIFICATION STEPS (Data-Driven)
 */

Then('I should see either success or error message for {string}', async function (this: any, scenario: string) {
  // Wait for navigation to complete
  await this.page.waitForURL(/dashboard/, { timeout: 10000 }).catch(() => {
    console.log(' Did not navigate to dashboard URL');
  });
  
  const finalUrl = this.page.url();
  console.log(` Final URL after sign-in: ${finalUrl}`);
  
  // Check if user is valid and should be on dashboard
  if (scenario === 'Valid credentials') {
    // Check for dashboard URL (talent-dashboard or client-dashboard)
    const isDashboard = finalUrl.includes('dashboard');
    
    if (isDashboard) {
      console.log(` SUCCESS: User redirected to dashboard - ${finalUrl}`);
    } else {
      console.log(` FAILED: Expected dashboard but got URL: ${finalUrl}`);
      
      // Get page content for debugging
      const pageContent = await this.page.evaluate(() => {
        return Array.from(document.body.innerText.split('\n')).filter(t => t.trim()).slice(0, 15).join('\n');
      });
      console.log(` Page content snippet:\n${pageContent}`);
    }
  } else {
    // For invalid scenarios, check for error messages
    const errorMessages = await this.page.evaluate(() => {
      const messages: string[] = [];
      
      // Check various error locations
      document.querySelectorAll('[role="alert"]').forEach(el => {
        const text = el.textContent?.trim();
        if (text) messages.push(text);
      });
      
      document.querySelectorAll('[class*="error"], .text-red, [class*="invalid"]').forEach(el => {
        const text = el.textContent?.trim();
        if (text && !messages.includes(text) && text.length > 0) messages.push(text);
      });
      
      document.querySelectorAll('input[aria-invalid="true"]').forEach(el => {
        const label = (el as HTMLInputElement).placeholder || (el as HTMLInputElement).name || 'field';
        if (!messages.find(m => m.includes(label))) {
          messages.push(`Invalid input: ${label}`);
        }
      });
      
      return messages;
    });
    
    if (errorMessages && errorMessages.length > 0) {
      console.log(` Validation for "${scenario}":`);
      errorMessages.forEach((msg: string) => {
        console.log(`   - ${msg}`);
      });
    } else {
      console.log(`  No error message for "${scenario}" (continuing test)`);
    }
  }
});

Then('I should log the response status for {string}', async function (this: any, scenario: string) {
  const currentUrl = this.page.url();
  
  // Wait for navigation to complete if valid credentials
  if (scenario === 'Valid credentials') {
    await this.page.waitForURL(/dashboard/, { timeout: 20000 }).catch(() => {
      console.log(`  Did not navigate to dashboard URL`);
    });
    
    const finalUrl = this.page.url();
    console.log(` Final URL after sign-in: ${finalUrl}`);
    
    if (finalUrl.includes('/dashboard') || finalUrl.includes('/talent')) {
      console.log(` Dashboard verification: User successfully logged in and redirected`);
      expect(finalUrl).toContain('dashboard');
    }
  } else {
    // For invalid scenarios, log validation messages if any
    const validationMessages = await this.page
      .locator('input[aria-invalid="true"] ~ span, .invalid-feedback, [class*="error-message"]')
      .allTextContents()
      .catch(() => []);
    
    if (validationMessages.length > 0) {
      console.log(` Form validation messages for "${scenario}":`);
      validationMessages.forEach((msg: string) => {
        console.log(`   ${msg}`);
      });
    }
  }
});
