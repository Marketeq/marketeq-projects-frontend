import { expect } from "@playwright/test"
import type { Locator, Page } from "@playwright/test"

/**
 * Page Object Model for Sign In (Data-Driven Testing)
 */
export class SignInPage {
  readonly page: Page
  readonly BASE_URL: string

  // ========== SIGN IN LOCATORS ==========
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator

  constructor(page: Page, baseUrl?: string) {
    this.page = page
    this.BASE_URL =
      baseUrl ?? process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000"

    // Sign In Form
    this.emailInput = page.locator("input#email")
    this.passwordInput = page.locator("input#password")
    this.loginButton = page
      .locator("button")
      .filter({ hasText: /Login to my account/i })
  }

  // ========== NAVIGATION METHODS ==========

  async navigateToSignIn() {
    console.log(` Navigating to sign-in page: ${this.BASE_URL}/sign-in`)
    await this.page.goto(`${this.BASE_URL}/sign-in`, {
      waitUntil: "domcontentloaded",
    })

    console.log(` Currently on sign-in page: ${this.page.url()}`)

    // Wait for sign-in form inputs to exist
    await this.page.waitForSelector("input#email", { timeout: 10000 })
    await this.page.waitForSelector("input#password", { timeout: 10000 })
    console.log(` Sign-in form is ready`)

    // Disable browser native validation on all forms - Keep test consistent accross browsers
    await this.page.evaluate(() => {
      document.querySelectorAll("form").forEach((form) => {
        form.setAttribute("novalidate", "true")
      })
    })
  }

  // ========== SIGN IN METHODS ==========

  async enterEmail(email: string) {
    // Handle EMPTY placeholder
    if (email !== "EMPTY") {
      await this.emailInput.waitFor({ state: "visible" })
      await this.emailInput.fill(email)
    }
  }

  async enterPassword(password: string) {
    // Handle EMPTY placeholder
    if (password !== "EMPTY") {
      await this.passwordInput.waitFor({ state: "visible" })
      await this.passwordInput.fill(password)
    }
  }

  async clickSignInButton() {
    console.log(`  Clicking sign-in button...`)
    await this.loginButton.click()
    console.log(` Sign-in button clicked`)
  }

  // ========== VERIFICATION METHODS ==========

  async verifySignInOk(): Promise<void> {
    await this.page.waitForURL(/dashboard/, { timeout: 10000 }).catch(() => {
      console.log("Did not navigate to dashboard URL")
    })

    const finalUrl = this.page.url()
    console.log(`Final URL after sign-in: ${finalUrl}`)

    const isDashboard = finalUrl.includes("dashboard")
    if (isDashboard) {
      console.log(`SUCCESS: User redirected to dashboard - ${finalUrl}`)
    } else {
      console.log(`FAILED: Expected dashboard but got URL: ${finalUrl}`)
      const pageContent = await this.page.evaluate(() => {
        return Array.from(document.body.innerText.split("\n"))
          .filter((t) => t.trim())
          .slice(0, 15)
          .join("\n")
      })
      console.log(`Page content snippet:\n${pageContent}`)
    }

    await expect(this.page).toHaveURL(/dashboard/, { timeout: 10000 })
  }

  async verifySignInFail(expected: string): Promise<void> {
    // Verify user is NOT on dashboard
    const finalUrl = this.page.url()
    expect(finalUrl).not.toContain("dashboard")

    // Verify the exact expected message is shown
    const errorMessage = this.page.getByText(expected, { exact: false })
    await expect(errorMessage).toBeVisible({ timeout: 5000 })

    console.log(`Expected error: "${expected}" — found on page`)
  }
}
