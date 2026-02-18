import {
  CheckUsernameParams,
  CreatePasswordParams,
  GoogleLoginParams,
  LinkedInLoginParams,
  LoginParams,
  SignUpParams,
} from "@/types/auth"
import AxiosRequest from ".."

const API_BASE = process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3001"
export const AuthAPI = {
  SignUpWithEmail: (data: SignUpParams) => {
 
    // email-only signup
    return AxiosRequest.post(`${API_BASE}/auth/register-email`, {
      email: data.email,
    })
  },

  LoginWithEmail: (data: LoginParams) => {
    return AxiosRequest.post(`${API_BASE}/auth/login`, data)
  },

  LoginWithGoogle: (data: GoogleLoginParams) => {
    return AxiosRequest.post("/auth/google/login", data)
  },

  LoginWithLinkedIn: (data: LinkedInLoginParams) => {
    return AxiosRequest.post("/auth/linkedin/login", data)
  },

  CheckUsername: (data: CheckUsernameParams) => {
    return AxiosRequest.post(`${API_BASE}/auth/check-username`, data)
  },

  CreatePassword: (data: CreatePasswordParams) => {
    return AxiosRequest.post("/auth/reset/new-password", data)
  },

  Logout: () => {
    return AxiosRequest.post(`${API_BASE}/auth/logout`, null, {
      withCredentials: true,
    })
  },
}

