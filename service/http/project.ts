import { CreateProjectType } from "@/types/project"
import AxiosRequest from ".."

export const ProjectAPI = {
  CreateProject: (data: CreateProjectType | FormData) => {
    return AxiosRequest.post("/publish/project", data, {
      headers: {
        "Content-Type":
          data instanceof FormData ? "multipart/form-data" : "application/json",
      },
    })
  },
}
