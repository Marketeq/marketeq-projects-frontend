import { CreateTalentType } from "@/types/talent"
import AxiosRequest from ".."

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? ""
console.log(API_BASE)
export const TalentAPI = {
  CreateTalent: (data: CreateTalentType | FormData) => {
    return AxiosRequest.post(`${API_BASE}/talent`, data)
      // headers: {
      //   "Content-Type":
      //     data instanceof FormData ? "multipart/form-data" : "application/json",
      // },
  },
}
