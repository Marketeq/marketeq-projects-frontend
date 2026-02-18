import { CreateTalentType } from "@/types/talent"
import AxiosRequest from ".."
import Cookies from "js-cookie"

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? ""
export const TalentAPI = {
  CreateTalent: (data: CreateTalentType | FormData) => {
    const token = Cookies.get("access_token")
    return AxiosRequest.post(`${API_BASE}/talent`, data, {
  headers: { Authorization: `Bearer ${token}` },
})
  },
}
