// pages/EducationFormPage.ts
import { type Locator, type Page, expect } from "@playwright/test"

export class EducationFormPage {
  readonly educationFormDialog: Locator
  readonly schoolName: Locator
  readonly degree: Locator
  readonly major: Locator
  readonly startDateMonth: Locator
  readonly startDateYear: Locator
  readonly endDateMonth: Locator
  readonly endDateYear: Locator
  readonly currentlyAttending: Locator
  readonly saveButton: Locator
  readonly cancelButton: Locator
  readonly backButton: Locator
  readonly page: Page

  constructor(page: Page) {
    this.page = page
    this.educationFormDialog = page.getByRole("heading", { name: "Education" })

    this.schoolName = page.getByRole("textbox", {
      name: "School or University",
    })

    this.degree = page.getByRole("button", { name: "Select Degree" })

    this.major = page.getByRole("textbox", { name: "Major" })

    this.startDateMonth = page.locator('[id="headlessui-listbox-button-:r2:"]')
    this.startDateYear = page.locator('[id="headlessui-listbox-button-:r3:"]')

    this.endDateMonth = page.locator('[id="headlessui-listbox-button-:r4:"]')
    this.endDateYear = page.locator('[id="headlessui-listbox-button-:r5:"]')

    this.currentlyAttending = page.getByText(`I'm currently attending`)

    this.cancelButton = page.getByRole("button", { name: "Cancel" })

    this.saveButton = page.getByRole("button", { name: "Save" })

    this.backButton = page.getByRole("button", { name: "Back" })
  }

  async enterSchoolName(school: string = "Harvard University"): Promise<void> {
    await this.schoolName.waitFor({ state: "visible" })
    await this.schoolName.fill(school)
  }

  async enterMajor(school: string = "Comptuer Science"): Promise<void> {
    await this.major.waitFor({ state: "visible" })
    await this.major.fill(school)
  }

  async selectDegree(degree: string = `Master's Degree`): Promise<void> {
    await this.degree.click()
    await this.page.getByRole("option", { name: degree, exact: true }).click()
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

  async checkCurrentlyAttending(): Promise<void> {
    await this.currentlyAttending.check()
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
  async fillEducationForm(data: {
    schoolName?: string
    degree?: string
    major?: string
    startMonth?: string
    startYear?: string
    endMonth?: string
    endYear?: string
    currentlyAttending?: boolean
  }): Promise<void> {
    if (data.schoolName) await this.enterSchoolName(data.schoolName)
    if (data.degree) await this.selectDegree(data.degree)
    if (data.major) await this.enterMajor(data.major)
    if (data.startMonth && data.startYear)
      await this.selectStartDate(data.startMonth, data.startYear)
    if (data.endMonth && data.endYear)
      await this.selectEndDate(data.endMonth, data.endYear)
    if (data.currentlyAttending) await this.checkCurrentlyAttending()
  }
}
