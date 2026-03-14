// pages/workExperienceFormPage.ts
import { type Locator, type Page, expect } from "@playwright/test"

export class WorkExperienceFormPage {
  readonly workExperienceFormDialog: Locator
  readonly employer: Locator
  readonly jobTitle: Locator
  readonly startDateMonth: Locator
  readonly startDateYear: Locator
  readonly endDateMonth: Locator
  readonly endDateYear: Locator
  readonly currentlyWorkHere: Locator
  readonly jobDescription: Locator
  readonly skillsSearchInput: Locator
  readonly saveButton: Locator
  readonly cancelButton: Locator
  readonly backButton: Locator
  readonly page: Page

  constructor(page: Page) {
    this.page = page
    this.workExperienceFormDialog = page.getByRole("heading", {
      name: "Work Experience",
    })

    this.employer = page.getByRole("textbox", { name: "Employer" })

    this.jobTitle = page.getByRole("textbox", { name: "Job Title" })

    this.startDateMonth = page.locator('[id="headlessui-listbox-button-:r1:"]')
    this.startDateYear = page.locator('[id="headlessui-listbox-button-:r2:"]')

    this.endDateMonth = page.locator('[id="headlessui-listbox-button-:r3:"]')
    this.endDateYear = page.locator('[id="headlessui-listbox-button-:r4:"]')

    this.currentlyWorkHere = page.getByText("I currently work here")

    this.jobDescription = page.getByRole("textbox", { name: "Job Description" })

    this.skillsSearchInput = page.getByRole("combobox", {
      name: "Search for skills",
    })

    this.cancelButton = page.getByRole("button", { name: "Cancel" })

    this.saveButton = page.getByRole("button", { name: "Save" })

    this.backButton = page.getByRole("button", { name: "Back" })
  }

  async enterEmployer(employer: string = "Marketeq"): Promise<void> {
    await this.employer.waitFor({ state: "visible" })
    await this.employer.fill(employer)
  }

  async enterJobTitle(jobTitle: string = "CEO"): Promise<void> {
    await this.jobTitle.waitFor({ state: "visible" })
    await this.jobTitle.fill(jobTitle)
  }

  async selectStartDate(month: string, year: string): Promise<void> {
    await this.startDateMonth.click()
    await this.page.getByRole("option", { name: month, exact: true }).click()

    await this.startDateYear.click()
    await this.page.getByRole("option", { name: year, exact: true }).click()
  }

  async selectEndDate(month: string, year: string): Promise<void> {
    await this.endDateMonth.click()
    await this.page.getByRole("option", { name: month, exact: true }).click()

    await this.endDateYear.click()
    await this.page.getByRole("option", { name: year, exact: true }).click()
  }

  async checkCurrentlyWorkHere(): Promise<void> {
    await this.currentlyWorkHere.check()
  }

  async enterJobDescription(
    jobDescription: string = "Tell us a little about the company you worked with..."
  ): Promise<void> {
    await this.jobDescription.waitFor({ state: "visible" })
    await this.jobDescription.fill(jobDescription)
  }

  private getSkillOption(skill: string): Locator {
    return this.page.getByRole("listbox").getByRole("option", { name: skill })
  }

  async addSkill(skill: string): Promise<void> {
    await this.skillsSearchInput.scrollIntoViewIfNeeded()
    await this.skillsSearchInput.waitFor({ state: "visible" })
    await this.skillsSearchInput.click()
    await this.skillsSearchInput.fill(skill)
    await this.getSkillOption(skill).waitFor({
      state: "visible",
      timeout: 10_000,
    })
    await this.getSkillOption(skill).click()
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
  async fillWorkExperienceForm(data: {
    employer?: string
    jobTitle?: string
    startMonth?: string
    startYear?: string
    endMonth?: string
    endYear?: string
    currentlyWorkHere?: boolean
    jobDescription?: string
    skills?: string
  }): Promise<void> {
    if (data.employer) await this.enterEmployer(data.employer)
    if (data.jobTitle) await this.enterJobTitle(data.jobTitle)
    if (data.startMonth && data.startYear)
      await this.selectStartDate(data.startMonth, data.startYear)
    if (data.endMonth && data.endYear)
      await this.selectEndDate(data.endMonth, data.endYear)
    if (data.currentlyWorkHere) await this.checkCurrentlyWorkHere()
    if (data.jobDescription) await this.enterJobDescription(data.jobDescription)
    if (data.skills) await this.addSkill(data.skills)
  }
}
