import AxiosRequest from ".."

const USER_BASE_ENV = process.env.NEXT_PUBLIC_USER_URL ?? ""
const USER_BASE =
  USER_BASE_ENV === "http://localhost:3003" ||
  USER_BASE_ENV === "http://127.0.0.1:3003"
    ? "/__user"
    : USER_BASE_ENV || "/__user"

export const UserAPI = {
  me: () => {
    return AxiosRequest.get(`${USER_BASE}/user/me`)
  },
  getById: (id: string) => {
    return AxiosRequest.get(`${USER_BASE}/users/${id}`)
  },
  handleSkip: (data: { role: string }) =>
    AxiosRequest.patch(`${USER_BASE}/user/onboarding-dismissed`, data),
}
