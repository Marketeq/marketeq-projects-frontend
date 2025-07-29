import {
  CheckUsernameParams,
  GoogleLoginParams,
  LinkedInLoginParams,
  LoginParams,
  SignUpParams,
} from "@/types/auth"
import AxiosRequest from ".."

export const AuthAPI = {
  SignUpWithEmail: (data: SignUpParams) => {
    return AxiosRequest.post("/auth/signup", data)
  },

  LoginWithEmail: (data: LoginParams) => {
    return AxiosRequest.post("/auth/login", data)
  },

  LoginWithGoogle: (data: GoogleLoginParams) => {
    return AxiosRequest.post("/auth/google/login", data)
  },

  LoginWithLinkedIn: (data: LinkedInLoginParams) => {
    return AxiosRequest.post("/auth/linkedin/login", data)
  },

  CheckUsername: (data: CheckUsernameParams) => {
    return AxiosRequest.post("/auth/check-username", data)
  },
}
