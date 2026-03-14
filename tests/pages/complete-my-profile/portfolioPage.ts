// pages/PortfolioPage.ts
import { type Locator, type Page, expect } from "@playwright/test"

export class PortfolioPage {
  readonly portfolioDialog: Locator
  readonly skipButton: Locator
  readonly continueButton: Locator
  readonly backButton: Locator
  readonly closeButton: Locator
  readonly addProject: Locator
  readonly saveProject: Locator

  constructor(page: Page) {
    this.portfolioDialog = page.getByRole("heading", { name: "Portfolio" })

    this.skipButton = page.getByRole("button", {
      name: "Skip",
    })

    this.continueButton = page.getByRole("button", {
      name: "Save & Continue",
    })

    this.backButton = page.getByRole("button", {
      name: "Back",
    })

    this.closeButton = page.getByRole("button").filter({ hasText: /^$/ })

    this.addProject = page.getByRole("heading", { name: "Add a project" })

    this.saveProject = page.getByRole("button", { name: "Save" })
  }

  async isVisible(): Promise<void> {
    await expect(this.portfolioDialog).toBeVisible({ timeout: 10_000 })
  }

  async addPortfolio(): Promise<void> {
    await this.addProject.click()
  }

  async savePortfolio(): Promise<void> {
    await this.saveProject.click()
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
