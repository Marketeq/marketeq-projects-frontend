// pages/JobTitleAndRatePage.ts
import { type Locator, type Page, expect } from "@playwright/test"

export class JobTitleAndRatePage {
  readonly jobTitleAndRateDialog: Locator
  readonly skipButton: Locator
  readonly continueButton: Locator
  readonly backButton: Locator
  readonly closeButton: Locator
  readonly addjobTitleAndRateButton: Locator

  constructor(page: Page) {
    this.jobTitleAndRateDialog = page.getByRole("heading", {
      name: "Job Title & Rate",
    })

    this.skipButton = page.getByRole("button", { name: "Skip" })

    this.continueButton = page.getByRole("button", { name: "Save & Continue" })

    this.backButton = page.getByRole("button", { name: "Back" })

    this.closeButton = page.getByRole("button").filter({ hasText: /^$/ }).nth(2)

    this.addjobTitleAndRateButton = page.getByRole("button", {
      name: "Add Job Title",
    })
  }

  async isVisible(): Promise<void> {
    await expect(this.jobTitleAndRateDialog).toBeVisible({ timeout: 10_000 })
  }

  async addJobTitleAndRate(): Promise<void> {
    await this.addjobTitleAndRateButton.click()
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.waitFor({
      state: "attached",
      timeout: 10_000,
    })
    await expect(this.continueButton).toBeEnabled()
    await this.continueButton.click()
  }
}
