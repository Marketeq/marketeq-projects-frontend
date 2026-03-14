// pages/CompleteProfilePage.ts
import { type Locator, type Page, expect } from "@playwright/test"

export class CompleteProfilePage {
  readonly page: Page
  readonly BASE_URL: string

  readonly completeProfileButton: Locator
  readonly statusDialog: Locator

  readonly aboutMe: Locator
  readonly portfolio: Locator
  readonly skills: Locator
  readonly workExperience: Locator
  readonly education: Locator
  readonly jobTitleAndRate: Locator

  private stepDoneLocators: Record<string, Locator> = {}

  constructor(page: Page, baseUrl?: string) {
    this.page = page
    this.BASE_URL =
      baseUrl ?? process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000"

    this.completeProfileButton = page.getByRole("button", {
      name: "Complete My Profile",
    })
    this.statusDialog = page.getByRole("dialog")

    this.aboutMe = page
      .locator("article")
      .filter({ hasText: "About Me" })
      .getByRole("button", { name: "Finish This Step" })
    this.portfolio = page
      .locator("article")
      .filter({ hasText: "Portfolio" })
      .getByRole("button", { name: "Finish This Step" })
    this.skills = page
      .locator("article")
      .filter({ hasText: "Skills" })
      .getByRole("button", { name: "Finish This Step" })
    this.workExperience = page
      .locator("article")
      .filter({ hasText: "Work Experience" })
      .getByRole("button", { name: "Finish This Step" })
    this.education = page
      .locator("article")
      .filter({ hasText: "Education" })
      .getByRole("button", { name: "Finish This Step" })
    this.jobTitleAndRate = page
      .locator("article")
      .filter({ hasText: "Job Title & Rate" })
      .getByRole("button", { name: "Finish This Step" })

    this.stepDoneLocators = {
      "About Me": page.getByRole("img").nth(1),
      Portfolio: page.getByRole("img").nth(2),
      Skills: page.getByRole("img").nth(3),
      "Work Experience": page.getByRole("img").nth(4),
      Education: page.getByRole("img").nth(5),
      "Job Title & Rate": page.getByRole("img").nth(6),
    }
  }

  async navigateToCompleteProfile() {
    console.log(
      `Navigating to complete-profile page: ${this.BASE_URL}/complete-profile`
    )
    await this.page.goto(`${this.BASE_URL}/complete-profile`, {
      waitUntil: "networkidle",
    })

    await this.completeProfileButton.waitFor({
      state: "visible",
      timeout: 10_000,
    })

    console.log(`Currently on complete-profile page: ${this.page.url()}`)
  }

  async clickCompleteMyProfile(): Promise<void> {
    // Wait for button to be enabled/interactive, not just visible
    await this.completeProfileButton.waitFor({
      state: "attached",
      timeout: 10_000,
    })
    await expect(this.completeProfileButton).toBeEnabled()

    await this.completeProfileButton.click()

    // Wait for dialog to appear as part of the click action
    await this.statusDialog.waitFor({ state: "visible", timeout: 10_000 })
  }

  async verifyDialogIsVisible(): Promise<void> {
    await expect(this.statusDialog).toBeVisible()
  }

  async verifyStepIsComplete(stepName: string): Promise<void> {
    const locator = this.stepDoneLocators[stepName]
    if (!locator) throw new Error(`Unknown step: "${stepName}"`)
    await expect(locator).toBeVisible({ timeout: 10_000 })
  }
}
