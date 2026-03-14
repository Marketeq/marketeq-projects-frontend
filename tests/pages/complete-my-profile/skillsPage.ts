// pages/SkillsPage.ts
import { type Locator, type Page, expect } from "@playwright/test"

export class SkillsPage {
  readonly skillsDialog: Locator
  readonly skipButton: Locator
  readonly continueButton: Locator
  readonly backButton: Locator
  readonly closeButton: Locator
  readonly skillsSearchInput: Locator
  readonly page: Page

  constructor(page: Page) {
    this.page = page
    this.skillsDialog = page.getByRole("heading", { name: "Skills" })

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

    this.skillsSearchInput = page.getByRole("combobox", {
      name: "Search for skills",
    })
  }

  async isVisible(): Promise<void> {
    await expect(this.skillsDialog).toBeVisible({ timeout: 10_000 })
  }

  private getSkillOption(skill: string): Locator {
    return this.page.getByRole("listbox").getByRole("option", { name: skill })
  }

  async addSkill(skill: string): Promise<void> {
    await this.skillsSearchInput.waitFor({ state: "visible" })
    await this.skillsSearchInput.click()
    await this.skillsSearchInput.fill(skill)
    await this.getSkillOption(skill).waitFor({
      state: "visible",
      timeout: 10_000,
    })
    await this.getSkillOption(skill).click()
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
