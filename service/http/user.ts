import AxiosRequest from ".."

export const UserAPI = {
  me: () => {
    return AxiosRequest.get("/user/me")
  },
  handleSkip: (data: { role: string }) =>
    AxiosRequest.patch("/user/onboarding-dismissed", data),
}
