export type SignUpParams = {
  email: string
  password: string
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
