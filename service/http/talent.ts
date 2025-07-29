import { CreateTalentType } from "@/types/talent"
import AxiosRequest from ".."

export const TalentAPI = {
  CreateTalent: (data: CreateTalentType | FormData) => {
    return AxiosRequest.post("/talent", data, {
      headers: {
        "Content-Type":
          data instanceof FormData ? "multipart/form-data" : "application/json",
      },
    })
  },
}
