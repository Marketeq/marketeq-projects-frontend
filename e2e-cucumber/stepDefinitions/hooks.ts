import { Before, After, AfterStep } from '@cucumber/cucumber';
import { chromium, APIRequestContext } from '@playwright/test';
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

let backgroundStepCount = 0;
let currentStepCount = 0;
//Hooks to manage browser lifecycle and capture screenshots for Cucumber tests with Playwright
Before(async function () {
  // Launch browser in headed mode for debugging (set HEADLESS=false in env)
  const headless = process.env.HEADLESS !== "false";
  
  // Launch options to bypass Google security detection
  const launchOptions = {
    headless,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-dev-shm-usage',
      '--no-first-run',
      '--no-default-browser-check',
    ]
  };
  
  this.browser = await chromium.launch(launchOptions);
  
  // Create context and page with user agent
  this.context = await this.browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  this.page = await this.context.newPage();
  
  // Add stealth script to hide automation
  await this.page.addInitScript(() => {
    if (navigator.webdriver === false) {
      // Already hidden
      return;
    }
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
  });
  
  // Create API context for REST calls
  this.apiContext = await this.context.request;
  
  // Count background steps - they are the first N steps with type 'background'
  // Get all steps and find where scenario steps start
  const allSteps = this.pickle?.steps || this.scenario?.pickle?.steps || [];
  backgroundStepCount = 0;
  
  // Background steps appear first in the steps array and have specific markers
  // Check if pickle has a background property
  if (this.pickle?.background && this.pickle.background.length > 0) {
    backgroundStepCount = this.pickle.background.length;
  } else if (this.scenario?.pickle?.background && this.scenario.pickle.background.length > 0) {
    backgroundStepCount = this.scenario.pickle.background.length;
  } else {
    // Fallback: count steps until we see a Scenario keyword
    // For this feature, background has 4 steps
    backgroundStepCount = 4;
  }
  
  currentStepCount = 0;  // Reset step counter for new scenario
  console.log(`📋 Scenario has ${backgroundStepCount} background steps, total steps: ${allSteps.length}`);
});

AfterStep(async function (this: any, stepInfo: any) {
  // Increment step counter
  currentStepCount++;
  
  const stepResult = stepInfo?.result?.status;
  const isBackgroundStep = currentStepCount <= backgroundStepCount;
  
  // Only capture screenshots for scenario steps, NOT background steps
  if (!isBackgroundStep && stepResult === 'PASSED') {
    try {
      if (this.page && !this.page.isClosed()) {
        // Wait longer for page to settle - prevent screenshots from being 1 step ahead
        await this.page.waitForTimeout(1500);
        
        const stepScreenshot = await this.page.screenshot({ fullPage: true });
        const stepName = (stepInfo?.step?.text || "step").substring(0, 50);
        console.log(`📸 Step screenshot: ${stepName}... (${stepScreenshot.length} bytes)`);
        
        // Attach to report with step name
        await this.attach(stepScreenshot, "image/png");
      }
    } catch (e) {
      console.warn(`⚠️ Step screenshot failed: ${e}`);
    }
  }
});

After(async function (this: any, scenario) {
  console.log(`🔍 After hook called for scenario: ${scenario.pickle.name}`);
  console.log(`   Page exists: ${!!this.page}, Closed: ${this.page?.isClosed()}`);
  
  try {
    // ✅ Capture final full-page screenshot BEFORE closing browser
    if (this.page && !this.page.isClosed()) {
      // Wait a moment for page to settle before screenshot
      await this.page.waitForTimeout(1000);
      console.log(`📸 Capturing final screenshot...`);
      const finalScreenshot = await this.page.screenshot({ fullPage: true });
      console.log(`✅ Screenshot captured, size: ${finalScreenshot.length} bytes`);

      // Attach to HTML report (this shows in cucumber-report.html)
      console.log(`📎 Attaching screenshot to report...`);
      await this.attach(finalScreenshot, "image/png");
      await this.attach(`Final URL: ${this.page.url()}`, "text/plain");
      console.log(`✅ Screenshot attached to report`);

      // 📁 Also save to disk for archival
      const screenshotsDir = path.resolve(process.cwd(), "reports/screenshots");
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
      }

      const scenarioName = scenario.pickle.name.replace(/\s+/g, "-").toLowerCase();
      const status = scenario.result?.status ?? "unknown";
      const timestamp = Date.now();
      const filepath = path.join(screenshotsDir, `${scenarioName}-${status}-${timestamp}.png`);
      fs.writeFileSync(filepath, finalScreenshot);

      console.log(`📁 Screenshot saved to disk: ${filepath}`);
    } else {
      console.warn(`⚠️ Page not available for screenshot`);
    }
  } catch (e) {
    console.error(`❌ Screenshot capture failed:`, e);
  } finally {
    // ✅ Now close the browser after screenshots are taken
    console.log(`🔴 Closing browser...`);
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
});
