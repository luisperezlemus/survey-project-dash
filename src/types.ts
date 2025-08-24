
export type SurveyProject = {
    id: string
    termTitle: string
    courseSections: number // default 0
    enrollments: number // default 0
    surveyTemplate: string // hardcoded string
    createdAt: string
    status: "Draft" | "Published" | "Live" | "Closed"
}

export type SurveySeries = {
    id: string
    name: string
    projects: SurveyProject[]
}