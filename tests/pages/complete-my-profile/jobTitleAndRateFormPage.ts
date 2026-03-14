// pages/JobTitleAndRateFormPage.ts
import { type Locator, type Page, expect } from "@playwright/test"

export class JobTitleAndRateFormPage {
  readonly educationFormDialog: Locator
  readonly jobTitle: Locator
  readonly defaultJobTitle: Locator
  readonly clientRate: Locator
  readonly yourEarnings: Locator
  readonly saveButton: Locator
  readonly cancelButton: Locator
  readonly backButton: Locator
  readonly page: Page

  constructor(page: Page) {
    this.page = page
    this.educationFormDialog = page.getByRole("heading", {
      name: "Job Title & Rate",
    })

    this.jobTitle = page.getByRole("textbox", { name: "Job Title 1" })

    this.defaultJobTitle = page.getByText("Save as default job title")

    this.clientRate = page.locator('[id="client-rate"]')

    this.yourEarnings = page.locator('[id="your-earning"]')

    this.cancelButton = page.getByRole("button", { name: "Cancel" })

    this.saveButton = page.getByRole("button", { name: "Save" })

    this.backButton = page.getByRole("button", { name: "Back" })
  }

  async enterJobTitle(job: string = "Software Engineer"): Promise<void> {
    await this.jobTitle.waitFor({ state: "visible" })
    await this.jobTitle.fill(job)
  }

  async checkDefaultJobTitle(): Promise<void> {
    await this.defaultJobTitle.check()
  }

  async enterClientRate(rate: string): Promise<void> {
    await this.clientRate.waitFor({ state: "visible" })
    await this.clientRate.fill(rate)
  }

  async enterYourEarnings(rate: string): Promise<void> {
    await this.yourEarnings.waitFor({ state: "visible" })
    await this.yourEarnings.fill(rate)
  }

  async clickCancel(): Promise<void> {
    await this.cancelButton.waitFor({ state: "visible" })
    await this.cancelButton.click()
  }

  async clickSave(): Promise<void> {
    await this.saveButton.waitFor({ state: "visible" })
    await this.saveButton.click()
  }

  async clickBack(): Promise<void> {
    await this.backButton.waitFor({ state: "visible" })
    await this.backButton.click()
  }

  // Fills all fields and saves in one call
  async fillJobTitleAndRateForm(data: {
    jobTitle?: string
    defaultJobTitle?: boolean
    clientRate?: string
    yourEarnings?: string
  }): Promise<void> {
    if (data.jobTitle) await this.enterJobTitle(data.jobTitle)
    if (data.clientRate) await this.enterClientRate(data.clientRate)
    if (data.yourEarnings) await this.enterYourEarnings(data.yourEarnings)
    if (data.defaultJobTitle) await this.checkDefaultJobTitle()
  }
}
