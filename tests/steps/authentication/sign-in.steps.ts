import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { SignInPage } from "tests/pages/authentication/signInPage"

setDefaultTimeout(60_000)

Given("I am on the sign-in page", async function (this: any) {
  const signInPage = new SignInPage(this.page)
  await signInPage.navigateToSignIn()
})

When("I enter email as {string}", async function (this: any, email: string) {
  if (email === "EMPTY") return // skip filling, leave field empty
  const signInPage = new SignInPage(this.page)
  await signInPage.enterEmail(email)
})

When(
  "I enter password as {string}",
  async function (this: any, password: string) {
    if (password === "EMPTY") return // skip filling, leave field empty
    const signInPage = new SignInPage(this.page)
    await signInPage.enterPassword(password)
  }
)

When("I click the sign-in button", async function (this: any) {
  const signInPage = new SignInPage(this.page)
  await signInPage.clickSignInButton()
})

Then("I should be redirected to the dashboard", async function (this: any) {
  const signInPage = new SignInPage(this.page)
  await signInPage.verifySignInOk()
})

Then(
  "I should see an error message for {string}",
  async function (this: any, scenario: string) {
    const signInPage = new SignInPage(this.page)
    await signInPage.verifySignInFail(scenario)
  }
)
