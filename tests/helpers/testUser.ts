// tests/helpers/testUser.ts

export interface TestUser {
  email: string
  password: string
  accessToken: string
  refreshToken: string
}

let currentTestUser: TestUser | null = null

export const setTestUser = (user: TestUser): void => {
  currentTestUser = user
}

export const getTestUser = (): TestUser => {
  if (!currentTestUser) {
    throw new Error(
      "Test user not created yet — ensure @requiresUser hook ran first"
    )
  }
  return currentTestUser
}

export const clearTestUser = (): void => {
  currentTestUser = null
}
