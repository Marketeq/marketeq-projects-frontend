import AxiosRequest from ".."

export const UserAPI = {
  me: () => {
    return AxiosRequest.get("/user/me")
  },
}
