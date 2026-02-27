import { CreateProjectType } from "@/types/project"
import AxiosRequest from ".."

type CreatePhaseTaskPayload = {
  taskName: string
  role: string
  location: string[]
  experience: string[]
  experienceLevel: string
  duration: string
  estimatedHours?: number
  phaseId: string
}

type CreatePhasePayload = {
  name: string
  stageName: string
  startDay: number
  endDay: number
  order: number
  projectId: string
  tasks: CreatePhaseTaskPayload[]
}

type CreateTaskPayload = CreatePhaseTaskPayload

type UpdateTaskPayload = Pick<
  CreateTaskPayload,
  "taskName" | "role" | "location" | "experience" | "duration"
>

export const ProjectAPI = {
  CreateProject: (data: CreateProjectType | FormData) => {
    return AxiosRequest.post("/publish/project", data, {
      headers: {
        "Content-Type":
          data instanceof FormData ? "multipart/form-data" : "application/json",
      },
    })
  },
  UploadMedia: (data: FormData) => {
    return AxiosRequest.post("/publish/media", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  CreatePhase: (data: CreatePhasePayload) => {
    return AxiosRequest.post("/publish/phase", data)
  },
  DuplicatePhase: (phaseId: string) => {
    return AxiosRequest.post(`/publish/phase/${phaseId}/duplicate`, {})
  },
  UpdatePhase: (phaseId: string, data: { name: string }) => {
    return AxiosRequest.put(`/publish/phase/update/${phaseId}`, data)
  },
  DeletePhase: (phaseId: string) => {
    return AxiosRequest.del(`/publish/phase/delete/${phaseId}`)
  },
  CreateTask: (data: CreateTaskPayload) => {
    return AxiosRequest.post("/publish/task", data)
  },
  UpdateTask: (id: string, data: UpdateTaskPayload) => {
    return AxiosRequest.put(`/publish/task/update/${id}`, data)
  },
}
