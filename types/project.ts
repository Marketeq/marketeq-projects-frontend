export type CategoryWithSubcategoriesType = {
  category: string
  subcategories: string[]
}

export type MediaType = {
  featuredImage?: File
  additionalImages?: File[]
  videoUrl?: string
}

export type ProjectScopeTaskType = {
  taskName: string
  role: string
  location: string[]
  experience: string
  duration: number
}

export type ProjectScopePhaseType = {
  name: string
  stage: string
  startDay: number
  endDay: number
  tasks: ProjectScopeTaskType[]
}

export type CreateProjectType = {
  title: string
  shortDescription: string
  longDescription: string
  categoriesWithSubcategories: CategoryWithSubcategoriesType[]
  industries?: string[]
  media?: MediaType
  tags?: string[]
  skills?: string[]
  phases?: ProjectScopePhaseType[]
  initialTeamBudget?: number
  userId: string
}
