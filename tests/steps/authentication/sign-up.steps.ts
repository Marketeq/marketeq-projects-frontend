// tests/steps/authentication/sign-up.steps.ts
import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { SignUpPage } from "tests/pages/authentication/signUpPage"

setDefaultTimeout(180_000)

// ─── Background ────────────────────────────────────────────────────────────────

Given(
  "Avatar fixture image is available for talent onboarding",
  async function (this: any) {
    const signUpPage = new SignUpPage(this.page)
    await signUpPage.verifyAvatarFixture()
  }
)

// ─── Sign Up Steps ─────────────────────────────────────────────────────────────

When("I enter a unique email and accept terms", async function (this: any) {
  const signUpPage = new SignUpPage(this.page)
  this.testEmail = await signUpPage.enterUniqueEmailAndAcceptTerms()
})

When(
  "I click {string} button on signup",
  async function (this: any, buttonText: string) {
    const signUpPage = new SignUpPage(this.page)
    await signUpPage.clickButton(buttonText)
  }
)

Then(
  "I should be redirected to {string} screen after email signup",
  async function (this: any, screenName: string) {
    const signUpPage = new SignUpPage(this.page)
    await signUpPage.verifyRedirectToScreen(screenName)
  }
)

// ─── Onboarding Steps ──────────────────────────────────────────────────────────

When("I select {string} option", async function (this: any, option: string) {
  const signUpPage = new SignUpPage(this.page)
  if (option.toLowerCase().includes("looking for work")) {
    await signUpPage.selectLookingForWork()
  } else {
    await this.page.getByText(new RegExp(option, "i")).click()
  }
})

When("I upload avatar and enter my name", async function (this: any) {
  const signUpPage = new SignUpPage(this.page)
  await signUpPage.uploadAvatarAndEnterName()
})

When("I enter my username", async function (this: any) {
  const signUpPage = new SignUpPage(this.page)
  this.testUsername = await signUpPage.enterUsername()
})

When("I enter my location and languages", async function (this: any) {
  const signUpPage = new SignUpPage(this.page)
  await signUpPage.enterLocationAndLanguages()
})

When("I enter my professional details", async function (this: any) {
  const signUpPage = new SignUpPage(this.page)
  await signUpPage.enterProfessionalDetails()
})

When("I set my preferences and availability", async function (this: any) {
  const signUpPage = new SignUpPage(this.page)
  await signUpPage.setPreferencesAndAvailability()
})

Then("I should reach the success screen", async function (this: any) {
  const signUpPage = new SignUpPage(this.page)
  await signUpPage.verifySuccessScreen()
})

When(
  "I click {string} on success screen",
  async function (this: any, buttonText: string) {
    const signUpPage = new SignUpPage(this.page)
    await signUpPage.clickOnSuccessScreen(buttonText)
  }
)

// ─── Password Modal Steps ───────────────────────────────────────────────────────

Then(
  "I should see the {string} modal",
  async function (this: any, modalTitle: string) {
    const signUpPage = new SignUpPage(this.page)
    this.isModalVisible = await signUpPage.verifyModalIsVisible(modalTitle)
  }
)

Then("I pause to set password manually", async function (this: any) {
  console.log("⏸️  Pausing test for manual password setup in UI...")
  await this.page.pause()
})

When("I set password automatically in the modal", async function (this: any) {
  const signUpPage = new SignUpPage(this.page)
  this.testPassword = "Test@12345"
  await signUpPage.fillPasswordFields(this.testPassword)
})

When("I enter password in both fields", async function (this: any) {
  const signUpPage = new SignUpPage(this.page)
  await signUpPage.fillPasswordFields()
})

When("I submit the password form", async function (this: any) {
  const signUpPage = new SignUpPage(this.page)
  await signUpPage.submitPasswordForm()
})

When("I close the password modal", async function (this: any) {
  const signUpPage = new SignUpPage(this.page)
  await signUpPage.closePasswordModal()
})

// ─── Dashboard & Logout Steps ──────────────────────────────────────────────────

When("I logout from the dashboard", async function (this: any) {
  const signUpPage = new SignUpPage(this.page)
  await signUpPage.logout()
})

When(
  "I am on the sign-in page and sign in with the registered email and password",
  async function (this: any) {
    const signUpPage = new SignUpPage(this.page)
    await signUpPage.signInWithCredentials(this.testEmail, this.testPassword)
  }
)

// ─── Verification Steps ────────────────────────────────────────────────────────

Then("I should be on the talent dashboard", async function (this: any) {
  const signUpPage = new SignUpPage(this.page)
  await signUpPage.verifyOnTalentDashboard()
})

Then(
  "I should see the talent dashboard without the modal",
  async function (this: any) {
    const signUpPage = new SignUpPage(this.page)
    await signUpPage.verifyDashboardWithoutModal()
  }
)

Then(
  "I should see a welcome message with my name, confirming successful login and onboarding completion",
  async function (this: any) {
    const signUpPage = new SignUpPage(this.page)
    await signUpPage.verifyWelcomeMessage()
  }
)

Then(
  "I should see my uploaded avatar image displayed on the dashboard, confirming successful onboarding and profile setup",
  async function (this: any) {
    const signUpPage = new SignUpPage(this.page)
    await signUpPage.verifyAvatarOnDashboard()
  }
)

// --- Google Auth Steps ---

Then("I click sign by google button", async function () {
  console.log("🔍 Looking for Google button...")

  // Wait for page to be fully loaded and network to be idle
  await this.page
    .waitForLoadState("networkidle", { timeout: 10000 })
    .catch(() => {})
  await this.page.waitForTimeout(1500)

  const googleBtn = this.page.getByRole("button", { name: /google/i }).first()
  await expect(googleBtn).toBeVisible({ timeout: 10000 })
  await expect(googleBtn).toBeEnabled({ timeout: 10000 })
  console.log("✅ Google button is visible and enabled")

  // Scroll button into view
  await googleBtn.scrollIntoViewIfNeeded()
  await this.page.waitForTimeout(500)

  // Try popup approach first
  console.log("📱 Setting up popup and navigation listeners...")
  const popupPromise = this.page
    .context()
    .waitForEvent("page", { timeout: 8000 })
  const navigationPromise = this.page
    .waitForNavigation({ timeout: 8000 })
    .catch(() => null)

  console.log("🖱️  Clicking Google button...")
  await googleBtn.click()

  // Wait a moment to see what happens
  await this.page.waitForTimeout(2000)

  try {
    this.googlePopup = await popupPromise
    console.log("✅ Google popup captured successfully (popup flow)")
    console.log(`   Popup URL: ${this.googlePopup.url()}`)
    this.authFlow = "popup"
  } catch (error) {
    // No popup opened - check if page redirected to Google
    await navigationPromise // Wait for any navigation to complete
    const currentUrl = this.page.url()
    console.log(`⚠️ No popup detected, checking for redirect flow...`)
    console.log(`   Current URL: ${currentUrl}`)

    if (
      currentUrl.includes("google") ||
      currentUrl.includes("accounts.google")
    ) {
      console.log("✅ Detected redirect-based Google authentication")
      this.googlePopup = this.page // Use the same page for redirect flow
      this.authFlow = "redirect"
    } else {
      // Button click didn't trigger navigation - try again with force
      console.log(
        "⚠️ First click didn't work, trying with force and waiting longer..."
      )
      await googleBtn.click({ force: true })

      // Wait up to 5 seconds for navigation
      const urlChanged = await this.page
        .waitForURL(/google|accounts\.google|onboarding/, { timeout: 5000 })
        .catch(() => false)

      if (urlChanged) {
        const newUrl = this.page.url()
        if (newUrl.includes("google") || newUrl.includes("accounts.google")) {
          console.log(
            "✅ Detected redirect-based Google authentication (after retry)"
          )
          this.googlePopup = this.page
          this.authFlow = "redirect"
        } else if (newUrl.includes("onboarding")) {
          throw new Error(
            "Unexpectedly redirected to onboarding - user may already be logged in"
          )
        }
      } else {
        throw new Error(
          `Google authentication not detected after clicking button. Current URL: ${this.page.url()}`
        )
      }
    }
  }
})

Then("I see Pop up page opens for google sign in", async function () {
  if (!this.googlePopup) {
    throw new Error(
      "Google authentication page was not captured in previous step"
    )
  }

  console.log(
    `⏳ Waiting for Google sign-in page to load (${this.authFlow} flow)...`
  )
  await this.googlePopup.waitForLoadState("domcontentloaded")

  const url = this.googlePopup.url()
  console.log(`✅ Google authentication page loaded: ${url}`)
})

Then(
  "I enter username and password and submit the form",
  { timeout: 360000 },
  async function () {
    const authPage = this.googlePopup
    const isRedirectFlow = this.authFlow === "redirect"

    console.log(`🔑 Using ${this.authFlow} flow for Google authentication`)

    // Check if automated credentials are available
    if (process.env.GOOGLE_TEST_EMAIL && process.env.GOOGLE_TEST_PASSWORD) {
      // Automated login
      console.log("🤖 Automated login with credentials...")
      await authPage.getByLabel(/email/i).fill(process.env.GOOGLE_TEST_EMAIL)
      await authPage.getByRole("button", { name: /next/i }).click()
      await authPage
        .getByLabel(/password/i)
        .fill(process.env.GOOGLE_TEST_PASSWORD)
      await authPage.getByRole("button", { name: /next/i }).click()
    } else {
      // Manual login - wait for user to complete the login
      console.log("\n")
      console.log("═══════════════════════════════════════════════")
      console.log("⏳ MANUAL GOOGLE LOGIN REQUIRED")
      console.log("═══════════════════════════════════════════════")
      console.log(
        `📱 Google login ${isRedirectFlow ? "page" : "popup"} has opened`
      )
      console.log("👤 Please enter your Google email and password")
      console.log("⏱️  You have 5 MINUTES to complete the login")
      console.log("═══════════════════════════════════════════════\n")
    }

    // Wait for redirect back to app (works for both popup and redirect flows)
    console.log("⏳ Waiting for authentication to complete...")
    await this.page.waitForURL(/\/onboarding|\/dashboard/, { timeout: 300000 })
    console.log("✅ Successfully authenticated and redirected back to app")
  }
)
