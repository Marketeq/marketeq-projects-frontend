// pages/EducationPage.ts
import { type Locator, type Page, expect } from "@playwright/test"

export class EducationPage {
  readonly educationDialog: Locator
  readonly skipButton: Locator
  readonly continueButton: Locator
  readonly backButton: Locator
  readonly closeButton: Locator
  readonly addeducationButton: Locator

  constructor(page: Page) {
    this.educationDialog = page.getByRole("heading", { name: "Education" })

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

    this.addeducationButton = page.getByRole("button", {
      name: "Add Education",
    })
  }

  async isVisible(): Promise<void> {
    await expect(this.educationDialog).toBeVisible({ timeout: 10_000 })
  }

  async addEducation(): Promise<void> {
    await this.addeducationButton.click()
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
