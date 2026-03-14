// tests/pages/authentication/signUpPage.ts
import { type Locator, type Page, expect } from "@playwright/test"
import path from "path"

const avatarPath = path.resolve(__dirname, "../../fixtures/avatar.jpg")

export class SignUpPage {
  readonly page: Page
  readonly BASE_URL: string

  // ─── Sign Up Form ──────────────────────────────────────────────────────
  readonly emailInput: Locator
  readonly termsCheckbox: Locator

  // ─── Onboarding - Role Selection ──────────────────────────────────────
  readonly lookingForWorkOption: Locator

  // ─── Onboarding - Introduce Yourself ──────────────────────────────────
  readonly uploadPictureButton: Locator
  readonly fileInput: Locator
  readonly saveImageButton: Locator
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator

  // ─── Onboarding - Username ────────────────────────────────────────────
  readonly usernameInput: Locator

  // ─── Onboarding - Location & Languages ───────────────────────────────
  readonly cityInput: Locator
  readonly languagesInput: Locator

  // ─── Onboarding - Professional Details ───────────────────────────────
  readonly recentJobTitleInput: Locator
  readonly industriesInput: Locator
  readonly skillInput: Locator

  // ─── Onboarding - Preferences & Availability ─────────────────────────
  readonly preferencesInput: Locator
  readonly availabilityDropdown: Locator

  // ─── Password Modal ───────────────────────────────────────────────────
  readonly passwordField: Locator
  readonly confirmPasswordField: Locator
  readonly closeWindowButton: Locator
  readonly successHeader: Locator

  // ─── Dashboard ────────────────────────────────────────────────────────
  readonly profileButton: Locator
  readonly logoutMenuItem: Locator

  // ─── Sign In ──────────────────────────────────────────────────────────
  readonly signInEmailInput: Locator
  readonly signInPasswordInput: Locator
  readonly loginButton: Locator

  constructor(page: Page, baseUrl?: string) {
    this.page = page
    this.BASE_URL =
      baseUrl ?? process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000"

    // Sign Up Form
    this.emailInput = page.locator("#email")
    this.termsCheckbox = page.locator("#agrees-to-terms-privacy-policy")

    // Role Selection
    this.lookingForWorkOption = page.getByText(/looking for work/i)

    // Introduce Yourself
    this.uploadPictureButton = page.getByRole("button", {
      name: /upload picture/i,
    })
    this.fileInput = page.locator('input[type="file"]')
    this.saveImageButton = page.getByRole("button", { name: /^save$/i })
    this.firstNameInput = page.locator("#first-name")
    this.lastNameInput = page.locator("#last-name")

    // Username
    this.usernameInput = page.locator("input#username")

    // Location & Languages
    this.cityInput = page.locator(
      'input[placeholder="Enter your city or town"]'
    )
    this.languagesInput = page.locator(
      'input[placeholder="Enter your languages"]'
    )

    // Professional Details
    this.recentJobTitleInput = page.locator("#recent-job-title")
    this.industriesInput = page.locator("#industries")
    this.skillInput = page.getByPlaceholder(
      "Enter job titles related to your project"
    )

    // Preferences & Availability
    this.preferencesInput = page.getByPlaceholder(
      "Enter your project preferences (e.g., Data Analysis)"
    )
    this.availabilityDropdown = page.locator("#availability")

    // Password Modal
    this.passwordField = page.locator('input[type="password"]').first()
    this.confirmPasswordField = page.locator('input[type="password"]').nth(1)
    this.closeWindowButton = page.getByRole("button", { name: /Close Window/i })
    this.successHeader = page.getByText("All set! You've secured your account")

    // Dashboard
    this.profileButton = page
      .locator('button:has(img)[aria-haspopup="menu"]')
      .first()
    this.logoutMenuItem = page.getByRole("menuitem", { name: "Log out" })

    // Sign In
    this.signInEmailInput = page.locator("input#email")
    this.signInPasswordInput = page.locator("input#password")
    this.loginButton = page
      .locator("button")
      .filter({ hasText: /Login to my account/i })
  }

  // ─── Helpers ───────────────────────────────────────────────────────────

  private async clickContinue(): Promise<void> {
    const button = this.page.getByRole("button", { name: /^continue$/i }).last()
    await expect(button).toBeVisible({ timeout: 15_000 })
    await expect(button).toBeEnabled({ timeout: 15_000 })
    await this.page.keyboard.press("Escape").catch(() => {})
    await button.click({ force: true })
    await this.page.waitForTimeout(1000)
  }

  private generateUniqueEmail(): string {
    return `reka_${Date.now()}@test.com`
  }

  private generateUniqueUsername(): string {
    return `user_${Date.now()}`
  }

  // ─── Sign Up Actions ───────────────────────────────────────────────────

  async verifyAvatarFixture(): Promise<void> {
    const fs = await import("fs")
    if (!fs.existsSync(avatarPath)) {
      throw new Error(`Avatar fixture not found at path: ${avatarPath}`)
    }
  }

  async enterUniqueEmailAndAcceptTerms(): Promise<string> {
    const email = this.generateUniqueEmail()
    await this.emailInput.fill(email)
    if (await this.termsCheckbox.isVisible().catch(() => false)) {
      await this.termsCheckbox.click()
    }
    return email
  }

  async clickButton(buttonText: string): Promise<void> {
    const button = this.page.getByRole("button", {
      name: new RegExp(buttonText, "i"),
    })
    await expect(button).toBeVisible({ timeout: 10_000 })
    await expect(button).toBeEnabled({ timeout: 10_000 })
    await this.page.context().clearCookies()
    await button.click()
  }

  async verifyRedirectToScreen(screenName: string): Promise<void> {
    const destination = await Promise.race([
      this.page
        .waitForURL(/\/onboarding/, { timeout: 30000 })
        .then(() => "onboarding"),
      this.page
        .waitForURL(/\/sign-in/, { timeout: 30000 })
        .then(() => "sign-in"),
    ])

    if (destination === "sign-in") {
      throw new Error(
        "Email signup redirected to /sign-in — email may already exist or verification required"
      )
    }

    await expect(
      this.page.getByRole("heading", { name: new RegExp(screenName, "i") })
    ).toBeVisible({ timeout: 15000 })
  }

  // ─── Onboarding Actions ────────────────────────────────────────────────

  async selectLookingForWork(): Promise<void> {
    await this.lookingForWorkOption.click()
    await this.page.waitForURL(/\/onboarding\/talent/, { timeout: 15000 })
  }

  async uploadAvatarAndEnterName(): Promise<void> {
    await expect(this.page.getByText(/introduce yourself/i)).toBeVisible({
      timeout: 15000,
    })

    if (await this.uploadPictureButton.isVisible().catch(() => false)) {
      await this.uploadPictureButton.click()
      await this.page.waitForSelector('input[type="file"]', { timeout: 10_000 })
      await this.page.setInputFiles('input[type="file"]', avatarPath)

      if (await this.saveImageButton.isVisible().catch(() => false)) {
        await this.saveImageButton.click()
        await this.page.waitForTimeout(1000)
      }
    }

    await this.firstNameInput.fill("Reka")
    await this.lastNameInput.fill("N")
    await this.clickContinue()
  }

  async enterUsername(): Promise<string> {
    await expect(this.page.getByText(/create your username/i)).toBeVisible({
      timeout: 15000,
    })
    const username = this.generateUniqueUsername()
    await this.usernameInput.fill(username)
    await this.clickContinue()
    return username
  }

  async enterLocationAndLanguages(): Promise<void> {
    await expect(this.page.getByText(/share your location/i)).toBeVisible({
      timeout: 15000,
    })
    await this.cityInput.fill("New York")
    await this.cityInput.press("Enter")
    await this.languagesInput.fill("English")
    await this.languagesInput.press("Enter")
    await this.clickContinue()
  }

  async enterProfessionalDetails(): Promise<void> {
    await expect(this.page.getByText(/showcase your talent/i)).toBeVisible({
      timeout: 15000,
    })
    await this.recentJobTitleInput.fill("QA Engineer")
    await this.industriesInput.fill("Software")
    await this.industriesInput.press("Enter")

    await expect(this.skillInput).toBeVisible({ timeout: 10_000 })
    await this.skillInput.fill("React")
    await this.skillInput.press("Enter")
    await this.page.waitForTimeout(800)

    await this.clickContinue()
  }

  async setPreferencesAndAvailability(): Promise<void> {
    for (let attempt = 0; attempt < 3; attempt++) {
      if (
        await this.preferencesInput
          .isVisible({ timeout: 3000 })
          .catch(() => false)
      )
        break

      const stillOnShowcase = await this.page
        .getByText(/showcase your talent/i)
        .isVisible()
        .catch(() => false)
      if (stillOnShowcase) {
        await this.clickContinue()
      }
    }

    await expect(this.preferencesInput).toBeVisible({ timeout: 15_000 })
    await this.preferencesInput.fill("Data Analysis")
    await this.preferencesInput.press("Enter")
    await this.page.keyboard.press("Escape").catch(() => {})
    await this.page.waitForTimeout(500)

    await expect(this.availabilityDropdown).toBeVisible({ timeout: 10_000 })
    await this.availabilityDropdown.click({ force: true })
    await this.page.waitForTimeout(500)

    const partTimeOption = this.page.getByRole("option", { name: /part-time/i })
    await expect(partTimeOption).toBeVisible({ timeout: 10_000 })
    await partTimeOption.click({ force: true })

    await this.clickContinue()
    await this.page.waitForTimeout(3000)
  }

  async verifySuccessScreen(): Promise<void> {
    await expect(
      this.page.getByText(/what would you like to do next/i)
    ).toBeVisible({ timeout: 15_000 })
  }

  async clickOnSuccessScreen(buttonText: string): Promise<void> {
    const btn = this.page
      .getByRole("button", { name: new RegExp(buttonText, "i") })
      .first()
    await expect(btn).toBeVisible({ timeout: 15000 })
    await expect(btn).toBeEnabled({ timeout: 15000 })
    await btn.click({ force: true })
    await this.page.waitForURL(/\/(talent|client)-dashboard/, {
      timeout: 20000,
    })
    await this.page
      .waitForLoadState("networkidle", { timeout: 15000 })
      .catch(() => {})
    await this.page.waitForTimeout(5000)
  }

  // ─── Password Modal Actions ────────────────────────────────────────────

  async verifyModalIsVisible(modalTitle: string): Promise<boolean> {
    const modalHeading = this.page.getByRole("heading", {
      name: new RegExp(modalTitle, "i"),
    })
    try {
      await expect(modalHeading).toBeVisible({ timeout: 30000 })
      return true
    } catch {
      const allHeadings = await this.page
        .locator("h1, h2, h3, h4, h5, h6")
        .allTextContents()
      console.error(
        `"${modalTitle}" modal not found. Headings on page: ${allHeadings.join(", ")}`
      )
      return false
    }
  }

  async fillPasswordFields(password: string = "Test@12345"): Promise<void> {
    await expect(this.passwordField).toBeVisible({ timeout: 10000 })
    await this.passwordField.fill(password)
    if (await this.confirmPasswordField.isVisible().catch(() => false)) {
      await this.confirmPasswordField.fill(password)
    }
  }

  async submitPasswordForm(): Promise<void> {
    const submitBtn = this.page.getByRole("button", {
      name: /continue|save|set password|submit/i,
    })
    await expect(submitBtn).toBeVisible({ timeout: 10000 })
    await submitBtn.click()

    const modalContainer = this.page.locator(
      'div[role="dialog"][data-state="open"]'
    )
    if ((await modalContainer.count()) > 0) {
      await this.page.keyboard.press("Escape")
      await this.page.evaluate(() => {
        document.querySelectorAll('[role="dialog"]').forEach((m) => m.remove())
        document
          .querySelectorAll(".fixed.inset-0.z-50")
          .forEach((b) => b.remove())
      })
    }

    await this.page.waitForLoadState("networkidle")
    await this.page.reload()
  }

  async closePasswordModal(): Promise<void> {
    const initialContinueBtn = this.page
      .getByRole("button", { name: "Continue", exact: true })
      .first()
    if (await initialContinueBtn.isVisible()) {
      await initialContinueBtn.click()
      await this.page.waitForTimeout(1000)
    }

    if (
      await this.successHeader.isVisible({ timeout: 5000 }).catch(() => false)
    ) {
      await this.closeWindowButton.click()
    }

    const backdrop = this.page.locator("div.fixed.inset-0.z-50").first()
    try {
      await expect(backdrop).toBeHidden({ timeout: 5000 })
    } catch {
      await this.page.evaluate(() => {
        document
          .querySelectorAll('div[role="dialog"], .fixed.inset-0')
          .forEach((el) => el.remove())
      })
    }

    if (this.page.url().includes("client-dashboard")) {
      await this.page.goto(`${this.BASE_URL}/talent-dashboard`)
      await this.page.waitForLoadState("networkidle")
    }
  }

  // ─── Dashboard Actions ─────────────────────────────────────────────────

  async logout(): Promise<void> {
    await this.page.waitForTimeout(1000)

    await this.page.evaluate(() => {
      document
        .querySelectorAll(
          '[role="dialog"], .fixed.inset-0, [data-state="open"], .backdrop'
        )
        .forEach((el) => el.remove())
    })

    await this.profileButton.waitFor({ state: "attached", timeout: 5000 })
    await this.profileButton.focus()
    await this.page.keyboard.press("Enter")

    try {
      await this.logoutMenuItem.waitFor({ state: "visible", timeout: 5000 })
      await this.logoutMenuItem.click()
    } catch {
      const allMenuItems = await this.page
        .locator('*[role="menuitem"], button, a')
        .all()
      for (const item of allMenuItems) {
        const text = await item.textContent()
        if (text && (text.includes("Log out") || text.includes("Logout"))) {
          await item.click({ force: true })
          break
        }
      }
    }

    await this.page.waitForURL(/\/(login|sign-in|signin)/, { timeout: 10000 })
  }

  // ─── Sign In Actions ───────────────────────────────────────────────────

  async signInWithCredentials(
    email: string,
    password: string = "Test@12345"
  ): Promise<void> {
    await this.page.waitForSelector("input#email", { timeout: 15000 })
    await this.page.waitForSelector("input#password", { timeout: 15000 })

    await this.signInEmailInput.scrollIntoViewIfNeeded()
    await this.signInEmailInput.fill(email)

    await this.signInPasswordInput.scrollIntoViewIfNeeded()
    await this.signInPasswordInput.fill(password)

    await this.loginButton.click()
    await this.page.waitForURL(/dashboard/, { timeout: 20000 }).catch(() => {})
  }

  // ─── Verification Methods ──────────────────────────────────────────────

  async verifyOnTalentDashboard(): Promise<void> {
    const finalUrl = this.page.url()
    expect(finalUrl).toContain("talent-dashboard")
    expect(finalUrl).not.toContain("client-dashboard")

    await this.page
      .evaluate(() => {
        document
          .querySelectorAll(
            '[role="dialog"], .fixed.inset-0, [data-state="open"]'
          )
          .forEach((el) => ((el as HTMLElement).style.display = "none"))
      })
      .catch(() => {})
  }

  async verifyDashboardWithoutModal(): Promise<void> {
    expect(this.page.url()).toContain("talent-dashboard")

    const secureAccountModal = this.page
      .locator('text="Secure your account"')
      .first()
    const isModalVisible = await secureAccountModal
      .isVisible()
      .catch(() => false)

    if (isModalVisible) {
      throw new Error(
        "Secure account modal should not appear after setting password and re-logging in"
      )
    }
  }

  async verifyWelcomeMessage(): Promise<void> {
    await this.page.waitForTimeout(2000)
    const welcomeText = this.page.locator("text=/Welcome|Hello|Hi/i").first()
    await expect(welcomeText).toBeVisible({ timeout: 5_000 })
    const nameText = this.page.locator("text=/Reka|reka/i").first()
    await expect(nameText).toBeVisible({ timeout: 3_000 })
  }

  async verifyAvatarOnDashboard(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded")
    await this.page.waitForTimeout(3000)
    const avatarBtn = this.page.getByRole("button", { name: /reka/i }).first()
    await expect(avatarBtn).toBeVisible({ timeout: 5_000 })
    const avatarImg = this.page.getByRole("img", { name: "Man" }).first()
    await expect(avatarImg).toBeVisible({ timeout: 3_000 })
  }
}
