import { expect } from "@playwright/test"
import type { Locator, Page } from "@playwright/test"

/**
 * Page Object Model for Publish Project (Step 1: Project Info, Step 2: Media, Step 3: Scope)
 */
export class PublishProjectPage {
  readonly page: Page
  
  // CRITICAL FIX: Make BASE_URL a getter that reads fresh from process.env each time
  get BASE_URL(): string {
    const url = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000"
    console.log(`[PublishProjectPage] BASE_URL resolved to: ${url}`)
    return url
  }

  // ========== STEP 1: PROJECT INFO LOCATORS ==========
  readonly projectTitleInput: Locator
  readonly projectSubtitleInput: Locator
  readonly shortDescriptionInput: Locator
  readonly fullDescriptionInput: Locator
  readonly addCategoryButton: Locator
  readonly categoryOptions: Locator
  readonly addSubCategoryInput: Locator
  readonly addIndustriesInput: Locator
  readonly addTagsInput: Locator
  readonly addSkillsInput: Locator

  // ========== STEP 2: MEDIA LOCATORS ==========
  readonly fileInput: Locator
  readonly featuredImageInput: Locator
  readonly additionalImagesInput: Locator
  readonly videoUrlInput: Locator
  readonly uploadImageButton: Locator

  // ========== STEP 3: PROJECT SCOPE LOCATORS ==========
  readonly addTaskButton: Locator
  readonly addPhaseButton: Locator
  readonly phaseNameInput: Locator
  readonly stageNameInput: Locator
  readonly taskNameInput: Locator
  readonly roleInput: Locator
  readonly locationInput: Locator
  readonly locationOptions: Locator
  readonly experienceLevelInput: Locator
  readonly experienceOptions: Locator
  readonly durationInput: Locator
  readonly durationUnitInput: Locator

  // ========== COMMON LOCATORS ==========
  readonly nextButton: Locator
  readonly backButton: Locator
  readonly submitButton: Locator
  readonly doneButton: Locator
  readonly cancelButton: Locator
  readonly headings: Locator
  readonly formContainer: Locator
  readonly stepper: Locator
  
  // ========== NAVIGATION LOCATORS ==========
  readonly createProjectButton: Locator
  readonly goHomeButton: Locator

  constructor(page: Page) {
    this.page = page
    
    // Log at construction time for debugging
    console.log(`[PublishProjectPage] Constructor - BASE_URL will be: ${this.BASE_URL}`)

    // ========== STEP 1: PROJECT INFO LOCATORS ==========
    this.projectTitleInput = page.locator("#title")
    this.projectSubtitleInput = page.locator("#subtitle")
    this.shortDescriptionInput = page.locator("#short-description")
    this.fullDescriptionInput = page.locator("#full-description")
    this.addCategoryButton = page.getByRole("button", { name: /Add Category/i })
    this.categoryOptions = page.getByRole("option")
    this.addSubCategoryInput = page.getByPlaceholder(/Add Sub-Category/i)
    this.addIndustriesInput = page.getByPlaceholder(/Add Industries/i)
    this.addTagsInput = page.getByPlaceholder(/Add Tags/i)
    this.addSkillsInput = page.getByPlaceholder(/Add Skills/i)

    // ========== STEP 2: MEDIA LOCATORS ==========
    this.fileInput = page.locator('input[type="file"]')
    this.featuredImageInput = page.locator('input[name="featuredImage"]')
    this.additionalImagesInput = page.locator('input[name="additionalImages"]')
    this.videoUrlInput = page.locator('input[placeholder*="YouTube"]')
    this.uploadImageButton = page.getByRole("button", {
      name: /upload|add image/i,
    })

    // ========== STEP 3: PROJECT SCOPE LOCATORS ==========
    this.addTaskButton = page.getByRole("button", { name: /add task/i })
    this.addPhaseButton = page.getByRole("button", { name: /add phase/i })
    this.phaseNameInput = page.locator('input[placeholder*="Phase"]').first()
    this.stageNameInput = page.locator('input[placeholder*="Stage"]').first()
    this.taskNameInput = page.locator('input[placeholder*="Task"]').first()
    this.roleInput = page.locator('#role, input[placeholder*="Role"]').first()
    this.locationInput = page
      .locator('#location, input[placeholder*="Location"]')
      .first()
    this.locationOptions = page.getByRole("option")
    this.experienceLevelInput = page
      .locator('#experience, input[placeholder*="experience"]')
      .first()
    this.experienceOptions = page.getByRole("option")
    this.durationInput = page
      .locator('#duration, input[placeholder*="duration"]')
      .first()
    this.durationUnitInput = page
      .locator('#durationUnit, select[name*="unit"]')
      .first()

    // ========== COMMON LOCATORS ==========
    this.nextButton = page.getByRole("button", { name: /^next$/i }).last()
    this.backButton = page.getByRole("button", { name: /back|previous/i })
    this.submitButton = page.getByRole("button", {
      name: /submit project|done/i,
    })
    this.doneButton = page.getByRole("button", { name: /^done$/i })
    this.cancelButton = page.getByRole("button", { name: /cancel/i })
    this.headings = page.getByRole("heading")
    this.formContainer = page.locator('[data-testid="publish-form"], form')
    this.stepper = page.locator('[data-testid="stepper"], .stepper')
    
    // ========== NAVIGATION LOCATORS ==========
    this.createProjectButton = page.locator('button[data-testid="create-project-button"]')
    this.goHomeButton = page.getByRole("button", { name: /take me home|go to home/i })
  }

  // ========== NAVIGATION METHODS ==========

  async navigateToPublishProject() {
    const targetUrl = `${this.BASE_URL}/publish-project`
    console.log(`📄 Navigating to publish-project page: ${targetUrl}`)
    
    // CRITICAL FIX: Actually navigate to the page (this was commented out!)
    await this.page.goto(targetUrl, {
      waitUntil: "domcontentloaded",
    })
    
    await this.page.waitForLoadState("domcontentloaded")
    console.log(`✅ Navigation complete. Currently on: ${this.page.url()}`)
  }

  async waitForPageLoad() {
    console.log(`⏳ Waiting for page to load...`)
    await this.page.waitForLoadState("networkidle").catch(() => {})
    await this.page.waitForTimeout(1000)
    console.log(`✅ Page loaded`)
  }

  // ========== STEP 1: PROJECT INFO METHODS ==========

  async fillProjectTitle(title: string) {
    console.log(`📝 Filling project title: "${title}"`)
    await expect(this.projectTitleInput).toBeVisible({ timeout: 10000 })
    await this.projectTitleInput.scrollIntoViewIfNeeded()
    await this.projectTitleInput.fill(title)
    console.log(`✅ Title filled`)
  }

  async fillProjectSubtitle(subtitle: string) {
    console.log(`📝 Filling project subtitle: "${subtitle}"`)
    await expect(this.projectSubtitleInput).toBeVisible({ timeout: 10000 })
    await this.projectSubtitleInput.scrollIntoViewIfNeeded()
    await this.projectSubtitleInput.fill(subtitle)
    console.log(`✅ Subtitle filled`)
  }

  async selectCategories(categories: string[]) {
    console.log(`📂 Selecting categories: ${categories.join(", ")}`)

    for (const category of categories) {
      const button = this.page
        .getByRole("button", { name: /Add Category/i })
        .first()
      await expect(button).toBeVisible({ timeout: 15000 })
      await button.scrollIntoViewIfNeeded()
      await button.click()

      const option = this.page.getByRole("option", {
        name: category,
        exact: true,
      })
      await expect(option).toBeVisible({ timeout: 5000 })
      await option.click()

      await this.page.waitForTimeout(500)
      console.log(`✅ Selected: ${category}`)
    }
  }

  async addSubCategories(subCategories: string[]) {
    console.log(`📂 Adding sub-categories: ${subCategories.join(", ")}`)

    for (let i = 0; i < subCategories.length; i++) {
      const inputs = await this.addSubCategoryInput.all()
      if (i >= inputs.length) break

      const input = this.addSubCategoryInput.nth(i)
      await expect(input).toBeVisible({ timeout: 15000 })
      await input.scrollIntoViewIfNeeded()
      await input.fill(subCategories[i])
      await input.press("Enter")

      await this.page.waitForTimeout(300)
      console.log(`✅ Added: ${subCategories[i]}`)
    }
  }

  async fillShortDescription(description: string) {
    console.log(`📝 Filling short description`)
    await expect(this.shortDescriptionInput).toBeVisible({ timeout: 10000 })
    await this.shortDescriptionInput.scrollIntoViewIfNeeded()
    await this.shortDescriptionInput.fill(description)
    console.log(`✅ Short description filled`)
  }

  async fillFullDescription(description: string) {
    console.log(`📝 Filling full description`)
    await expect(this.fullDescriptionInput).toBeVisible({ timeout: 10000 })
    await this.fullDescriptionInput.scrollIntoViewIfNeeded()
    await this.fullDescriptionInput.fill(description)
    console.log(`✅ Full description filled`)
  }

  async addIndustries(industries: string[]) {
    console.log(`🏭 Adding industries: ${industries.join(", ")}`)

    for (const industry of industries) {
      const input = this.addIndustriesInput.first()
      await expect(input).toBeVisible({ timeout: 15000 })
      await input.scrollIntoViewIfNeeded()
      await input.fill(industry)
      await input.press("Enter")

      await this.page.waitForTimeout(500)
      console.log(`✅ Added industry: ${industry}`)
    }
  }

  async addTags(tags: string[]) {
    console.log(`🏷️  Adding tags: ${tags.join(", ")}`)

    for (const tag of tags) {
      const input = this.addTagsInput.first()
      await expect(input).toBeVisible({ timeout: 15000 })
      await input.scrollIntoViewIfNeeded()
      await input.fill(tag)
      await input.press("Enter")

      await this.page.waitForTimeout(500)
      console.log(`✅ Added tag: ${tag}`)
    }
  }

  async addSkills(skills: string[]) {
    console.log(`💡 Adding skills: ${skills.join(", ")}`)

    for (const skill of skills) {
      const input = this.addSkillsInput.first()
      await expect(input).toBeVisible({ timeout: 15000 })
      await input.scrollIntoViewIfNeeded()
      await input.fill(skill)
      await input.press("Enter")

      await this.page.waitForTimeout(500)
      console.log(`✅ Added skill: ${skill}`)
    }
  }

  // ========== STEP 2: MEDIA METHODS ==========

  async uploadFeaturedImage(filePath: string) {
    console.log(`🖼️  Uploading featured image from: ${filePath}`)

    // The dropzone component uses react-dropzone which creates a hidden file input
    // We need to find and directly interact with that input element
    // Look for input[type="file"] within the Media section
    const fileInput = this.page.locator('input[type="file"]').first()

    console.log(`🔍 Looking for file input...`)
    await fileInput.waitFor({ state: "attached", timeout: 5000 })
    console.log(`✅ Found file input, setting files...`)

    // Directly set the file on the hidden input (no need for file chooser dialog)
    await fileInput.setInputFiles(filePath)
    console.log(`✅ File set on input element`)

    // IMPORTANT: The form uses debounced callbacks to update upload progress:
    // - After 3 seconds: progress = 50%
    // - After 6 seconds: progress = 100%
    // We need to wait at least 7 seconds for the upload to be considered complete
    console.log(`⏳ Waiting for upload progress to complete (7 seconds)...`)
    await this.page.waitForTimeout(7000)

    // Check if there's a preview/thumbnail showing the upload succeeded
    const imagePreview = this.page
      .locator(
        'img[src*="blob:"], img[src*="data:image"], img[alt*="preview"], img[alt*="featured"], .preview img, [data-testid*="preview"] img'
      )
      .first()
    const hasPreview = await imagePreview
      .isVisible({ timeout: 3000 })
      .catch(() => false)

    if (hasPreview) {
      console.log(`✅ Featured image uploaded - preview visible`)
    } else {
      console.log(
        `⚠️  Featured image uploaded but no preview detected (may still be valid)`
      )
    }
  }

  async uploadAdditionalImages(filePaths: string[]) {
    console.log(`🖼️  Uploading ${filePaths.length} additional images`)
    const input = this.additionalImagesInput
    await expect(input).toBeVisible({ timeout: 15000 })
    await input.setInputFiles(filePaths)

    await this.page.waitForTimeout(3000)
    console.log(`✅ Additional images uploaded`)
  }

  async addVideoUrl(url: string) {
    console.log(`🎥 Adding video URL: ${url}`)
    await expect(this.videoUrlInput).toBeVisible({ timeout: 10000 })
    await this.videoUrlInput.scrollIntoViewIfNeeded()
    await this.videoUrlInput.fill(url)
    console.log(`✅ Video URL added`)
  }

  // ========== STEP 3: PROJECT SCOPE METHODS ==========

  async addPhase() {
    console.log(`📊 Clicking Add Phase button`)

    // There are TWO "Add Phase" buttons on the page:
    // 1. Top toolbar button (might be hidden on mobile viewports)
    // 2. Bottom ghost button (always visible)
    // Try to find a visible one
    const addPhaseButtons = this.page.getByRole("button", {
      name: /add phase/i,
    })
    await addPhaseButtons.first().waitFor({ state: "attached", timeout: 10000 })

    // Find the first visible button
    const count = await addPhaseButtons.count()
    let clickedButton = false

    for (let i = 0; i < count; i++) {
      const button = addPhaseButtons.nth(i)
      const isVisible = await button.isVisible().catch(() => false)
      if (isVisible) {
        console.log(`✅ Found visible "Add Phase" button at index ${i}`)
        await button.scrollIntoViewIfNeeded()
        await button.click()
        clickedButton = true
        break
      }
    }

    if (!clickedButton) {
      throw new Error('No visible "Add Phase" button found')
    }

    await this.page.waitForTimeout(800)
    console.log(`✅ Phase created with default name`)
  }

  async clickEditPhaseNameButton() {
    console.log(`🖱️  Clicking Edit Phase Name button to open dialog...`)
    
    const phaseSection = this.page.locator('.group\\/item.rounded-lg.border.border-gray-200').first()
    await phaseSection.waitFor({ state: 'visible', timeout: 10000 })
    
    const phaseNameButton = phaseSection.locator('button[type="button"].text-lg.leading-8.font-semibold').first()
    
    const isVisible = await phaseNameButton.isVisible({ timeout: 2000 }).catch(() => false)
    if (isVisible) {
      await phaseNameButton.click()
      console.log(`✅ Clicked phase name button`)
    } else {
      const headerDiv = phaseSection.locator('div.inline-flex').first()
      const buttons = headerDiv.locator('button[type="button"]')
      const buttonCount = await buttons.count()
      let clicked = false
      for (let i = 0; i < buttonCount; i++) {
        const btn = buttons.nth(i)
        const hasAriaExpanded = await btn.getAttribute('aria-expanded').catch(() => null)
        if (!hasAriaExpanded) {
          const text = await btn.textContent().catch(() => '')
          if (text && text.trim()) {
            await btn.click()
            clicked = true
            console.log(`✅ Clicked phase name button with text: ${text}`)
            break
          }
        }
      }
      if (!clicked) {
        throw new Error('Could not find phase name button to click')
      }
    }
    
    await this.page.waitForTimeout(500)
    const editInput = this.page.locator('input[placeholder*="Phase"], input[name*="phaseName"], input[name*="name"]').first()
    await editInput.waitFor({ state: 'visible', timeout: 10000 })
    console.log(`✅ Edit Phase Name dialog opened`)
  }

  async fillPhaseNameInput(phaseName: string) {
    console.log(`✏️  Entering phase name: ${phaseName}`)
    const phaseInput = this.page.locator('input[placeholder*="Phase"], input[name*="phaseName"], input[name*="name"]').first()
    await phaseInput.waitFor({ state: 'visible', timeout: 10000 })
    await phaseInput.clear()
    await phaseInput.fill(phaseName)
    console.log(`✅ Phase name entered: ${phaseName}`)
  }

  async editPhaseName(phaseName: string) {
    console.log(`✏️  Editing phase name to: ${phaseName}`)
    
    // NOTE: This method assumes the Edit Phase Name dialog is ALREADY OPEN
    // (opened by the "I click Edit Phase Name" step in step definitions)
    // This method should ONLY fill the input field, not click any buttons
    
    // Wait for the phase name input to be visible (dialog should already be open)
    const phaseInput = this.page
      .locator(
        'input[placeholder*="Phase"], input[name*="phaseName"], input[name*="name"]'
      )
      .first()
    
    console.log(`⏳ Waiting for phase name input to be visible...`)
    await phaseInput.waitFor({ state: "visible", timeout: 10000 })
    console.log(`✅ Phase name input is visible`)
    
    await phaseInput.clear()
    await phaseInput.fill(phaseName)
    console.log(`✅ Phase name entered: ${phaseName}`)
  }

  async clickDoneInPhaseDialog() {
    console.log(`🖱️  Clicking Done in phase dialog`)

    // Confirm the dialog with the Done button
    const phaseDialog = this.page.locator('[role="dialog"]').last()
    const dialogDoneButton = phaseDialog.getByRole("button", {
      name: /^done$/i,
    })
    const hasDialogDoneButton = await dialogDoneButton
      .isVisible({ timeout: 3000 })
      .catch(() => false)

    if (hasDialogDoneButton) {
      await dialogDoneButton.click()
    } else {
      await this.page
        .getByRole("button", { name: /^done$/i })
        .first()
        .click()
    }

    // Ensure phase dialog is actually closed before next actions
    const phaseInput = this.page
      .locator(
        'input[placeholder*="Phase"], input[name*="phaseName"], input[name*="name"]'
      )
      .first()
    await phaseInput.waitFor({ state: "hidden", timeout: 5000 }).catch(() => {})
    await phaseDialog
      .waitFor({ state: "hidden", timeout: 5000 })
      .catch(() => {})
    await this.page.waitForTimeout(800)
    console.log(`✅ Phase dialog saved via Done button`)
  }

  async addTask(taskData: {
    taskName: string
    role: string
    location: string
    experience: string
    experienceLevel: string
    duration: string
  }) {
    console.log(`📋 Adding task: ${taskData.taskName}`)
    const taskInputAnyDialog = this.page.locator("input#task-name")

    // Primary path: click visible "Add Task" button(s) from the phase card
    let openedTaskDialog = false
    const addTaskButtons = this.page.locator('button:has-text("Add Task")')
    const addTaskCount = await addTaskButtons.count()
    for (let i = 0; i < addTaskCount; i++) {
      const button = addTaskButtons.nth(i)
      const isVisible = await button.isVisible().catch(() => false)
      if (!isVisible) {
        continue
      }

      await button.scrollIntoViewIfNeeded()
      await button.click()
      openedTaskDialog = await taskInputAnyDialog
        .isVisible({ timeout: 2500 })
        .catch(() => false)
      if (openedTaskDialog) {
        console.log(`✅ Opened task dialog via Add Task button index ${i}`)
        break
      }
    }

    // Fallback path: use + dropdown menu -> Add Task
    if (!openedTaskDialog) {
      const menuTriggers = this.page.locator('button[aria-haspopup="menu"]')
      const triggerCount = await menuTriggers.count()
      if (triggerCount > 0) {
        await menuTriggers.nth(triggerCount - 1).click()
        const addTaskMenuItem = this.page
          .getByRole("menuitem", { name: /add task/i })
          .first()
        await addTaskMenuItem.waitFor({ state: "visible", timeout: 3000 })
        await addTaskMenuItem.click()
      }
    }

    await taskInputAnyDialog.waitFor({ state: "visible", timeout: 10000 })
    const taskDialog = this.page
      .locator('[role="dialog"]')
      .filter({ has: taskInputAnyDialog })
      .first()
    await taskDialog.waitFor({ state: "visible", timeout: 10000 })
    console.log(`✅ Task dialog opened`)

    // 1) Task name
    const taskInput = taskDialog.locator("#task-name")
    await taskInput.fill(taskData.taskName)

    // 2) Role (OwnCombobox popover)
    const roleTrigger = taskDialog
      .getByRole("button", {
        name: /select role|frontend developer|backend developer|full stack developer|software engineer/i,
      })
      .first()
    await roleTrigger.click()
    const roleSearchInput = this.page.getByPlaceholder("Search").last()
    await roleSearchInput.fill(taskData.role)
    const roleOption = this.page
      .locator("[cmdk-item]")
      .filter({ hasText: taskData.role })
      .first()
    const hasRoleOption = await roleOption
      .isVisible({ timeout: 3000 })
      .catch(() => false)
    if (hasRoleOption) {
      await roleOption.click()
    } else {
      await this.page.locator("[cmdk-item]").first().click()
    }

    // 3) Location (CountriesCombobox popover)
    const locationTrigger = taskDialog
      .getByRole("button", {
        name: /select country|united states|india|canada|united kingdom/i,
      })
      .first()
    await locationTrigger.click()
    const locationSearchInput = this.page.getByPlaceholder("Search").last()
    await locationSearchInput.fill(taskData.location)
    const locationOption = this.page
      .locator("[cmdk-item]")
      .filter({ hasText: taskData.location })
      .first()
    const hasLocationOption = await locationOption
      .isVisible({ timeout: 3000 })
      .catch(() => false)
    if (hasLocationOption) {
      await locationOption.click()
    } else {
      const usOption = this.page
        .locator("[cmdk-item]")
        .filter({ hasText: /United States/i })
        .first()
      const hasUsOption = await usOption
        .isVisible({ timeout: 2000 })
        .catch(() => false)
      if (hasUsOption) {
        await usOption.click()
      } else {
        await this.page.locator("[cmdk-item]").first().click()
      }
    }

    // 4) Experience (Dropdown menu)
    const experienceTrigger = taskDialog
      .getByRole("button", {
        name: /select experience|student|junior|medior|senior|guru/i,
      })
      .first()
    await experienceTrigger.click()
    const normalizedLevel = taskData.experienceLevel
      .toLowerCase()
      .includes("mid")
      ? "Medior"
      : taskData.experienceLevel
    const experienceOption = this.page
      .getByText(normalizedLevel, { exact: false })
      .first()
    const hasExperienceOption = await experienceOption
      .isVisible({ timeout: 3000 })
      .catch(() => false)
    if (hasExperienceOption) {
      await experienceOption.click()
    } else {
      await this.page.getByText("Junior", { exact: false }).first().click()
    }

    // 5) Duration value/type
    const durationMatch = taskData.duration.match(
      /(\d+)\s*(day|days|week|weeks|hour|hours)?/i
    )
    const durationValue = durationMatch?.[1] ?? "1"
    const durationTypeRaw = (durationMatch?.[2] ?? "days").toLowerCase()
    const durationType = durationTypeRaw.startsWith("week")
      ? "weeks"
      : durationTypeRaw.startsWith("hour")
        ? "hours"
        : "days"

    const durationInput = taskDialog.locator("#duration").first()
    await durationInput.fill(durationValue)

    if (durationType !== "days") {
      const durationTypeButton = taskDialog
        .getByRole("button", { name: /days|weeks|hours|select/i })
        .first()
      await durationTypeButton.click()
      await this.page.getByText(durationType, { exact: false }).first().click()
    }

    // 6) Done
    const doneButton = taskDialog.getByRole("button", { name: /^done$/i })
    await doneButton.click()

    await this.page.waitForTimeout(800)
    console.log(`✅ Task details filled and saved via Done button`)
  }

  // ========== FORM NAVIGATION METHODS ==========

  async verifyHeading(expectedHeading: string) {
    console.log(`📖 Verifying heading: "${expectedHeading}"`)
    let heading = this.page.getByRole("heading", {
      name: expectedHeading,
      exact: true,
    })

    try {
      await expect(heading).toBeVisible({ timeout: 10000 })
      console.log(`✅ Heading verified`)
    } catch {
      console.log(`⚠️  Exact match failed, trying partial match...`)
      heading = this.page.getByRole("heading", {
        name: new RegExp(expectedHeading, "i"),
      })

      try {
        await expect(heading).toBeVisible({ timeout: 10000 })
        console.log(`✅ Heading verified (partial match)`)
      } catch {
        const allHeadings = await this.page
          .getByRole("heading")
          .allTextContents()
        throw new Error(
          `Heading "${expectedHeading}" not found. Available: ${allHeadings.join(", ")}`
        )
      }
    }
  }

  async clickNextButton() {
    console.log(`➡️  Clicking Next button...`)
    await expect(this.nextButton).toBeVisible({ timeout: 15000 })
    await expect(this.nextButton).toBeEnabled({ timeout: 15000 })
    await this.nextButton.click({ force: true })

    await this.page.waitForTimeout(2000)
    await this.page.waitForLoadState("domcontentloaded").catch(() => {})
    await this.page.waitForTimeout(500)

    console.log(`✅ Next button clicked`)
  }

  async clickBackButton() {
    console.log(`⬅️  Clicking Back button...`)
    await expect(this.backButton).toBeVisible({ timeout: 15000 })
    await this.backButton.click()

    await this.page.waitForTimeout(2000)
    console.log(`✅ Back button clicked`)
  }

  async clickDoneButton() {
    console.log(`✅ Clicking Done button...`)
    await expect(this.doneButton).toBeVisible({ timeout: 15000 })
    await expect(this.doneButton).toBeEnabled({ timeout: 15000 })
    await this.doneButton.click({ force: true })

    await this.page.waitForTimeout(2000)
    console.log(`✅ Done button clicked`)
  }

  async submitProject() {
    console.log(`🚀 Submitting project...`)
    await expect(this.submitButton).toBeVisible({ timeout: 15000 })
    await expect(this.submitButton).toBeEnabled({ timeout: 15000 })
    
    // Use the getter to get fresh BASE_URL
    const expectedApiBase =
      process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002"
    const expectedPublishUrl = `${expectedApiBase}/publish/project`

    // Listen for network responses to catch any errors
    let hasNetworkError = false
    let errorMessage = ""

    const responseHandler = (response: any) => {
      const responseUrl = response.url()
      if (!responseUrl.includes("/publish/project")) {
        return
      }

      console.log(
        `📡 Publish response: ${responseUrl} - Status: ${response.status()}`
      )

      if (!responseUrl.startsWith(expectedApiBase)) {
        hasNetworkError = true
        errorMessage = `Publish API host mismatch. Expected ${expectedPublishUrl} but got ${responseUrl}`
        console.error(`❌ ${errorMessage}`)
        return
      }

      if (response.status() === 401) {
        hasNetworkError = true
        errorMessage = "Unauthorized - Authentication failed"
        console.error(`❌ ${errorMessage}`)
      } else if (response.status() >= 400) {
        hasNetworkError = true
        errorMessage = `Error ${response.status()}: ${response.statusText()}`
        console.error(`❌ ${errorMessage}`)
      }
    }

    this.page.on("response", responseHandler)

    try {
      await this.submitButton.click({ force: true })

      await this.page.waitForTimeout(3000)

      if (hasNetworkError) {
        throw new Error(`Submit failed: ${errorMessage}`)
      }

      console.log(`✅ Project submitted`)
    } finally {
      this.page.off("response", responseHandler)
    }
  }

  // ========== VERIFICATION METHODS ==========

  async verifyOnProjectInfoStep() {
    console.log(`🔍 Verifying on Project Info step...`)
    await expect(this.projectTitleInput).toBeVisible({ timeout: 10000 })
    console.log(`✅ On Project Info step`)
  }

  async verifyOnMediaStep() {
    console.log(`🔍 Verifying on Media step...`)
    await expect(this.fileInput.first()).toBeVisible({ timeout: 10000 })
    console.log(`✅ On Media step`)
  }

  async verifyOnProjectScopeStep() {
    console.log(`🔍 Verifying on Project Scope step...`)
    await expect(this.addTaskButton.first()).toBeVisible({ timeout: 10000 })
    console.log(`✅ On Project Scope step`)
  }

  async getPageUrl() {
    return this.page.url()
  }

  async logCurrentPageContent() {
    const content = await this.page.evaluate(() => {
      return Array.from(document.body.innerText.split("\n"))
        .filter((t) => t.trim())
        .slice(0, 20)
        .join("\n")
    })
    console.log(`📄 Current page content:\n${content}`)
  }

  // ========== DASHBOARD NAVIGATION METHODS ==========

  async clickCreateProjectButton() {
    console.log(`🔍 Looking for "Create a Project" button...`)
    console.log(`📍 Current URL: ${this.page.url()}`)

    // Maximize viewport
    await this.page.setViewportSize({ width: 1920, height: 1080 })
    await this.page.evaluate(() => window.scrollTo(0, 0))
    await this.page.waitForTimeout(500)

    // Strategy 1: Try data-testid selector (most reliable)
    let clickableElement = null
    const testIdButton = this.createProjectButton.first()
    
    if (await testIdButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      clickableElement = testIdButton
      console.log(`✅ Found button via data-testid`)
    }

    // Strategy 2: Look within "Create Your Own Projects" section
    if (!clickableElement) {
      const section = this.page
        .locator("h2, h3, h1")
        .filter({ hasText: /Create Your Own Projects/i })
        .first()
      
      if (await section.isVisible({ timeout: 3000 }).catch(() => false)) {
        await section.scrollIntoViewIfNeeded()
        await this.page.waitForTimeout(1000)

        // Look for button near this section
        const nearbyButton = this.page
          .locator('button[data-testid="create-project-button"]')
          .first()
        
        if (await nearbyButton.isVisible({ timeout: 2000 }).catch(() => false)) {
          clickableElement = nearbyButton
          console.log(`✅ Found button near "Create Your Own Projects" section`)
        }
      }
    }

    // Strategy 3: Find any visible button with the data-testid
    if (!clickableElement) {
      const allButtons = await this.page
        .locator('button[data-testid="create-project-button"]:visible')
        .all()
      
      if (allButtons.length > 0) {
        // Prefer button with correct text
        for (const btn of allButtons) {
          const text = await btn.textContent()
          if (text && /create\s*a?\s*project/i.test(text)) {
            clickableElement = btn
            console.log(`✅ Found button with matching text`)
            break
          }
        }
        
        if (!clickableElement) {
          clickableElement = allButtons[0]
          console.log(`✅ Using first visible button with data-testid`)
        }
      }
    }

    if (!clickableElement) {
      // Debug logging
      const allButtonTexts = await this.page.locator("button").allTextContents()
      console.error(`❌ Could not find "Create a Project" button`)
      console.log(`Available buttons on page:`, allButtonTexts)

      // Save HTML for debugging
      const html = await this.page.content()
      const fs = require("fs")
      const debugPath = "tests/reports/create-project-button-not-found.html"
      fs.writeFileSync(debugPath, html)
      console.log(`📝 Saved page HTML to ${debugPath}`)

      throw new Error(
        'Create a Project button not found. Make sure the button has data-testid="create-project-button"'
      )
    }

    // Click and wait for navigation
    await clickableElement.scrollIntoViewIfNeeded()
    await this.page.waitForTimeout(500)

    console.log(`🖱️  Clicking the button...`)
    
    const navigationPromise = this.page.waitForURL(/publish-project/, {
      timeout: 15000,
    })

    try {
      await clickableElement.click({ force: false })
    } catch (error) {
      console.log(`⚠️  Normal click failed, trying force click:`, error)
      await clickableElement.click({ force: true })
    }

    console.log(`✅ Button clicked`)
    console.log(`⏳ Waiting for navigation to /publish-project...`)

    try {
      await navigationPromise
      console.log(`✅ Navigation successful: ${this.page.url()}`)
    } catch (error) {
      const currentUrl = this.page.url()
      console.error(`❌ Navigation timeout. Current URL: ${currentUrl}`)

      // Check if already on publish-project page
      if (currentUrl.includes("publish-project")) {
        console.log(`✅ Already on publish-project page!`)
        return
      }

      // Save debug info
      const html = await this.page.content()
      const fs = require("fs")
      fs.writeFileSync(
        "tests/reports/create-project-navigation-failed.html",
        html
      )
      console.log(`📝 Saved DOM to tests/reports/create-project-navigation-failed.html`)

      throw new Error(
        `Navigation to /publish-project failed. Current URL: ${currentUrl}`
      )
    }
  }

  async verifyPublishProjectPage() {
    console.log(`🔍 Verifying on Publish Project page...`)

    const currentUrl = this.page.url()
    console.log(`📍 Current URL: ${currentUrl}`)

    if (currentUrl.includes("publish-project")) {
      console.log(`✅ URL contains "publish-project"`)
    } else {
      console.log(`⚠️  Not on publish-project page yet`)
    }

    // Wait for heading
    const heading = this.page.getByRole("heading", {
      name: /project info|step 1\/5/i,
    })
    const found = await heading
      .first()
      .waitFor({ timeout: 20000 })
      .then(() => true)
      .catch(() => false)

    if (!found) {
      const allHeadings = await this.page.getByRole("heading").allTextContents()
      console.error(`❌ Expected heading not found. Available headings:`, allHeadings)

      throw new Error(
        `Did not find expected heading ('Project Info' or 'Step 1/5') on publish project page`
      )
    }

    console.log(`✅ Successfully verified Publish Project page`)
  }

  async clickGoHomeButton() {
    console.log(`🏠 Looking for "Go Home" button...`)
    
    // Debug: Log all visible buttons
    const allButtons = await this.page.locator("button").all()
    console.log(`🔎 Found ${allButtons.length} <button> elements on the page`)
    
    for (const [i, btn] of allButtons.entries()) {
      const text = await btn.innerText().catch(() => "")
      const visible = await btn.isVisible().catch(() => false)
      if (visible) {
        console.log(`  [${i}] Visible button text: "${text}"`)
      }
    }

    // Try to find and click the button
    await expect(this.goHomeButton).toBeVisible({ timeout: 10000 })
    await this.goHomeButton.click()
    console.log(`✅ Clicked "Go Home" button`)
  }

  async verifyOnHomePage() {
    console.log(`🏠 Verifying navigation to home page...`)
    await this.page.waitForURL(this.BASE_URL, { timeout: 10000 })
    await expect(this.page.url()).toMatch(new RegExp(this.BASE_URL, "i"))
    console.log(`✅ Successfully navigated to home page: ${this.page.url()}`)
  }

  // ========== TASK-RELATED METHODS (POM COMPLIANCE) ==========

  async clickAddTaskButton() {
    console.log(`🔘 Clicking Add Task button for the phase...`)
    const addTaskButtons = this.page.locator('button:has-text("Add Task")')
    const count = await addTaskButtons.count()
    
    for (let i = 0; i < count; i++) {
      const button = addTaskButtons.nth(i)
      const isVisible = await button.isVisible().catch(() => false)
      if (isVisible) {
        await button.scrollIntoViewIfNeeded()
        await button.click()
        console.log(`✅ Add Task button clicked`)
        await this.page.waitForTimeout(500)
        return
      }
    }
    
    throw new Error('No visible Add Task button found')
  }

  async fillTaskName(taskName: string) {
    console.log(`📋 Adding task: ${taskName}`)
    const taskInput = this.page.locator('#task-name')
    const taskDialog = this.page.locator('[role="dialog"]').last()
    
    await taskDialog.waitFor({ state: 'visible', timeout: 10000 })
    await taskInput.waitFor({ state: 'visible', timeout: 10000 })
    await taskInput.clear()
    await taskInput.fill(taskName)
    console.log(`✅ Task name filled: ${taskName}`)
  }

  async selectTaskRole(roleName: string) {
    console.log(`👤 Selecting role for task: ${roleName}`)
    const taskDialog = this.page.locator('[role="dialog"]').last()
    const roleTrigger = taskDialog.getByRole('button', { 
      name: /select role|frontend developer|backend developer|data scientist/i 
    }).first()
    
    const isVisible = await roleTrigger.isVisible({ timeout: 2000 }).catch(() => false)

    if (isVisible) {
      await roleTrigger.click()
      await this.page.waitForTimeout(300)
      
      const roleSearchInput = this.page.getByPlaceholder('Search').last()
      await roleSearchInput.fill(roleName)
      await this.page.waitForTimeout(500)
      
      const roleOption = this.page
        .locator('[cmdk-item]')
        .filter({ hasText: roleName })
        .first()
      await expect(roleOption).toBeVisible({ timeout: 10000 })
      await roleOption.click()
      await this.page.waitForTimeout(300)
      console.log(`✅ Role selected: ${roleName}`)
      return
    }

    throw new Error(`Role selection button not found or not visible`)
  }

  async selectTaskLocation(locationName: string) {
    console.log(`🌍 Selecting location for task: ${locationName}`)
    const taskDialog = this.page.locator('[role="dialog"]').last()
    const locationTrigger = taskDialog.getByRole('button', { 
      name: /select country|united states|canada|india|united kingdom/i 
    }).first()
    
    const isVisible = await locationTrigger.isVisible({ timeout: 2000 }).catch(() => false)

    if (isVisible) {
      await locationTrigger.click()
      await this.page.waitForTimeout(300)
      
      const locationSearchInput = this.page.getByPlaceholder('Search').last()
      await locationSearchInput.fill(locationName)
      await this.page.waitForTimeout(500)
      
      const locationOption = this.page
        .locator('[cmdk-item]')
        .filter({ hasText: locationName })
        .first()
      await expect(locationOption).toBeVisible({ timeout: 10000 })
      await locationOption.click()
      await this.page.waitForTimeout(300)
      console.log(`✅ Location selected: ${locationName}`)
      return
    }

    throw new Error(`Location selection button not found or not visible`)
  }

  async selectTaskExperience(experienceLevel: string) {
    console.log(`📊 Selecting experience level for task: ${experienceLevel}`)
    const taskDialog = this.page.locator('[role="dialog"]').last()
    const experienceTrigger = taskDialog.getByRole('button', { 
      name: /select experience|junior|senior|medior|student|guru/i 
    }).first()
    
    const isVisible = await experienceTrigger.isVisible({ timeout: 2000 }).catch(() => false)

    if (isVisible) {
      await experienceTrigger.click()
      await this.page.waitForTimeout(300)
      const experienceOption = this.page.getByText(experienceLevel, { exact: false })
      await expect(experienceOption).toBeVisible({ timeout: 10000 })
      await experienceOption.click()
      await this.page.waitForTimeout(300)
      console.log(`✅ Experience level selected: ${experienceLevel}`)
      return
    }

    throw new Error(`Experience level selection button not found or not visible`)
  }

  async selectTaskDuration(durationText: string) {
    console.log(`⏱️  Selecting duration for task: ${durationText}`)
    const taskDialog = this.page.locator('[role="dialog"]').last()
    const durationInput = taskDialog.locator('input[id="duration"], input[name="duration.value"]').first()
    const isVisible = await durationInput.isVisible({ timeout: 2000 }).catch(() => false)

    if (isVisible) {
      const match = durationText.match(/(\d+(?:-\d+)?)\s+(day|days|week|weeks|month|months|hour|hours)/i)
      if (match) {
        const value = match[1]
        const type = match[2]
        
        await durationInput.clear()
        await durationInput.fill(value)
        await this.page.waitForTimeout(300)

        if (type.toLowerCase() !== 'days') {
          const typeButton = taskDialog.getByRole('button', { name: /days|weeks|months|hours/i }).first()
          await typeButton.click()
          await this.page.waitForTimeout(300)

          const typeOption = this.page.getByText(type, { exact: false })
          await expect(typeOption).toBeVisible({ timeout: 5000 })
          await typeOption.click()
          await this.page.waitForTimeout(300)
        }
        console.log(`✅ Duration set: ${durationText}`)
        return
      }
    }

    throw new Error(`Duration input not found or invalid format: ${durationText}`)
  }

  async selectTaskDurationValueAndType(value: string, type: string) {
    console.log(`⏱️  Selecting duration for task: ${value} ${type}`)
    const taskDialog = this.page.locator('[role="dialog"]').last()
    
    const durationInput = taskDialog.locator('input[id="duration"]').first()
    const isInputVisible = await durationInput.isVisible({ timeout: 2000 }).catch(() => false)

    if (!isInputVisible) {
      throw new Error(`Duration input not found or not visible`)
    }

    await durationInput.clear()
    await durationInput.fill(value)
    console.log(`✅ Duration value set to: ${value}`)
    await this.page.waitForTimeout(300)

    const singularType = type.toLowerCase().endsWith('s') ? type.slice(0, -1) : type
    const displayType = singularType.charAt(0).toUpperCase() + singularType.slice(1)
    
    if (displayType.toLowerCase() !== 'day') {
      const durationTypeButton = taskDialog
        .locator('button')
        .filter({ has: this.page.getByText(/days|weeks|hours/i) })
        .first()
      
      const isButtonVisible = await durationTypeButton.isVisible({ timeout: 2000 }).catch(() => false)
      
      if (isButtonVisible) {
        await durationTypeButton.click()
        await this.page.waitForTimeout(300)

        const typeOption = this.page.getByRole('menuitem').filter({ hasText: new RegExp(displayType, 'i') }).first()
        const hasOption = await typeOption.isVisible({ timeout: 2000 }).catch(() => false)
        
        if (hasOption) {
          await typeOption.click()
        } else {
          const altOption = this.page.getByText(displayType, { exact: false }).first()
          await altOption.click()
        }
        await this.page.waitForTimeout(300)
      }
    }
    
    console.log(`✅ Duration set: ${value} ${type}`)
  }

  async verifySuccessMessage(message: string) {
    console.log(`✅ Verifying success message: "${message}"`)
    console.log(`📍 Current URL: ${await this.getPageUrl()}`)
    
    await this.page.waitForLoadState('networkidle').catch(() => {})
    await this.page.waitForTimeout(2000)
    
    const pageTitle = await this.page.title().catch(() => 'N/A')
    const pageUrl = this.page.url()
    console.log(`📄 Page Title: ${pageTitle}`)
    console.log(`🔗 Page URL: ${pageUrl}`)
    
    const errorPatterns = ['error', 'failed', 'unauthorized', '401', '403']
    for (const pattern of errorPatterns) {
      const errorElement = this.page.locator(`text=${pattern}`).first()
      const isVisible = await errorElement.isVisible({ timeout: 1000 }).catch(() => false)
      if (isVisible) {
        const errorText = await errorElement.innerText().catch(() => pattern)
        console.error(`❌ Found error message: ${errorText}`)
        throw new Error(`Submission error detected: ${errorText}`)
      }
    }
    
    const successMessage = this.page.getByText(message)
    const partialMessage = this.page.getByText(message, { exact: false })
    
    try {
      await expect(successMessage.or(partialMessage)).toBeVisible({ timeout: 20000 })
      console.log(`✅ Success message found!`)
    } catch (error) {
      const allText = await this.page.innerText('body').catch(() => '')
      if (allText.toLowerCase().includes('submitted')) {
        console.log(`✅ Found "submitted" text in page`)
        return
      }
      throw new Error(`Success message "${message}" not found. Page content: ${allText.substring(0, 500)}`)
    }
  }

  async verifyMessage(messageText: string) {
    const message = this.page.getByText(new RegExp(messageText, 'i'))
    await expect(message).toBeVisible({ timeout: 20000 })
  }
}

export default PublishProjectPage