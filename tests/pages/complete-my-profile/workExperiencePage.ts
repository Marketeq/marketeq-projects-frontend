// pages/workExperiencePage.ts
import { type Locator, type Page, expect } from "@playwright/test"

export class WorkExperiencePage {
  readonly workExperienceDialog: Locator
  readonly skipButton: Locator
  readonly continueButton: Locator
  readonly backButton: Locator
  readonly closeButton: Locator
  readonly addWorkExperienceButton: Locator

  constructor(page: Page) {
    this.workExperienceDialog = page.getByRole("heading", {
      name: "Work Experience",
    })

    this.skipButton = page.getByRole("button", {
      name: "Skip",
    })

    this.continueButton = page.getByRole("button", {
      name: "Save & Continue",
    })

    this.backButton = page.getByRole("button", {
      name: "Back",
    })

    this.closeButton = page.getByRole("button").filter({ hasText: /^$/ }).nth(2)

    this.addWorkExperienceButton = page.getByRole("button", {
      name: "Add Work Experience",
    })
  }

  async isVisible(): Promise<void> {
    await expect(this.workExperienceDialog).toBeVisible({ timeout: 10_000 })
  }

  async addworkExperience(): Promise<void> {
    await this.addWorkExperienceButton.click()
  }

  async clickContinue(): Promise<void> {
    // Wait for button to be enabled/interactive, not just visible
    await this.continueButton.waitFor({
      state: "attached",
      timeout: 10_000,
    })
    await expect(this.continueButton).toBeEnabled()

    await this.continueButton.click()
  }
}
