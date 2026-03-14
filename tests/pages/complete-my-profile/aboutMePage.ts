// pages/AboutMePage.ts
import { type Locator, type Page, expect } from "@playwright/test"

export class AboutMePage {
  readonly aboutMeDialog: Locator
  readonly textBox: Locator
  readonly skipButton: Locator
  readonly continueButton: Locator
  readonly backButton: Locator
  readonly closeButton: Locator

  constructor(page: Page) {
    this.aboutMeDialog = page.getByRole("heading", { name: "About Me" })

    this.textBox = page.getByRole("textbox", {
      name: "Enter your bio here...",
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

    this.closeButton = page.getByRole("button").filter({ hasText: /^$/ })
  }

  async isVisible(): Promise<void> {
    await expect(this.aboutMeDialog).toBeVisible({ timeout: 10_000 })
  }

  async enterText(text?: string): Promise<void> {
    const defaultText =
      "Sed et semper porttitor nisl cursus lobortis sapien. Amet pulvinar leo aliquet sed facilisi nibh ridiculus pellentesque aliquam. Euismod scelerisque tempus diam non porta volutpat et. Commodo arcu ipsum maecenas diam vitae massa. Tortor massa odio amet magna egestas faucibus leo. Libero rhoncus velit ut sed purus in. Fermentum pretium scelerisque curabitur est feugiat. Mauris sed bibendum elementum dolor aliquet sapien maecenas. Lectus sed porttitor metus arcu porta integer sagittis. Varius dolor ipsum lectus amet sagittis. Turpis pulvinar neque maecenas potenti ac porttitor fringilla nibh turpis. Sagittis dignissim urna et cursus tempor. At at eget quam blandit cras nullam velit. Elit et ultricies sed elementum."

    await this.textBox.fill(text ?? defaultText)
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
