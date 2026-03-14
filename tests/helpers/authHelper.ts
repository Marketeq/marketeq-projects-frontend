// tests/helpers/authHelper.ts
import { request } from "@playwright/test"
import { SignInPage } from "tests/pages/authentication/signInPage"
import { TestUser, getTestUser, setTestUser } from "./testUser"

const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL ?? "http://localhost:3001"

const buildTestUser = () => ({
  email: `testuser_${Date.now()}@test.com`,
  password: `Test@${Date.now()}`,
  firstName: "Test",
  lastName: "User",
})

const apiCall = async (
  apiContext: any,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  endpoint: string,
  options: { data?: any; headers?: any } = {}
) => {
  const response = apiContext[method.toLowerCase()](
    `${AUTH_URL}${endpoint}`,
    options
  )
  //const body =  await response.json()
  return response
}

const authHeaders = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
})

export const createTestUser = async (): Promise<TestUser> => {
  const apiContext = await request.newContext()
  const userData = buildTestUser()

  try {
    const response = await apiCall(apiContext, "POST", "/auth/register-email", {
      data: { email: userData.email },
    })

    if (response.status() !== 201) {
      throw new Error(`Registration failed with status: ${response.status()}`)
    }

    const body = await response.json()

    const setPasswordRes = await apiCall(
      apiContext,
      "PATCH",
      "/auth/set-password",
      {
        headers: authHeaders(body.access_token),
        data: {
          password: userData.password,
        },
      }
    )

    if (setPasswordRes.status() !== 200) {
      throw new Error(
        `Failed to set password with status: ${setPasswordRes.status()}`
      )
    }

    const accessToken = body.access_token
    const refreshToken = body.refresh_token

    const user: TestUser = {
      email: userData.email,
      password: userData.password,
      accessToken,
      refreshToken,
    }

    setTestUser(user)
    return user
  } finally {
    await apiContext.dispose()
  }
}

export const loginTestUser = async (): Promise<TestUser> => {
  const apiContext = await request.newContext()
  const user = getTestUser()

  try {
    const loginRes = await apiCall(apiContext, "POST", "/auth/login", {
      data: {
        email: user.email,
        password: user.password,
      },
    })

    if (loginRes.response.status() !== 200) {
      throw new Error(`Login failed with status: ${loginRes.response.status()}`)
    }

    const loginData = loginRes.body

    // Update tokens
    const updatedUser: TestUser = {
      ...user,
      accessToken: loginData.access_token,
      refreshToken: loginData.refresh_token,
    }

    setTestUser(updatedUser)
    return updatedUser
  } finally {
    await apiContext.dispose()
  }
}

export const logoutTestUser = async (): Promise<void> => {
  const apiContext = await request.newContext()
  const user = getTestUser()

  try {
    await apiCall(apiContext, "POST", "/auth/logout", {
      headers: authHeaders(user.accessToken),
    })
  } finally {
    await apiContext.dispose()
  }
}

export async function loginViaUI(
  page: any,
  email: string,
  password: string
): Promise<void> {
  const signInPage = new SignInPage(page)

  await signInPage.navigateToSignIn()
  await signInPage.enterEmail(email)
  await signInPage.enterPassword(password)
  await signInPage.clickSignInButton()
  await signInPage.verifySignInOk()
}
