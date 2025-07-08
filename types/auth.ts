export type SignUpParams = {
  email: string
  password?: string
}

export type LoginParams = {
  email: string
  password: string
}

export type GoogleLoginParams = {
  accessToken: string
}

export type LinkedInLoginParams = {
  code: string
  redirectUrl: string
}

export type CheckUsernameParams = {
  username: string
}

export type CreatePasswordParams = {
  password: string
}
