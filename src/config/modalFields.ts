import { ModalField } from "@/components/ui/Modal"

// modal fields for creating Survey Series
export const createSeriesFields: ModalField[] = [
  {
    id: "name",
    label: "Title",
    type: "string",
    required: true,
    placeholder: "Enter series title."
  }
]

// modal fields for creating Project Surveys
export const createProjectFields: ModalField[] = [
  {
    id: "termTitle",
    label: "Term Title",
    type: "string",
    required: true,
    placeholder: "Enter term title."
  },
  {
    id: "courseSections",
    label: "Course Sections Count",
    type: "number",
    required: true,
    placeholder: "Enter number of course sections."
  },
  {
    id: "enrollments",
    label: "Enrollments Count",
    type: "number",
    required: true,
    placeholder: "Enter number of enrollments."
  },
  {
    id: "surveyTemplate",
    label: "Survey Template",
    defaultValue: "Default Survey Template",
    type: "string",
    required: false,
    placeholder: "Enter survey template."
  },
  {
    id: "status",
    label: "Status",
    type: "select",
    required: true,
    placeholder: "Enter status.",
    options: [
      { value: "Draft", label: "Draft" },
      { value: "Published", label: "Published" },
      { value: "Live", label: "Live" },
      { value: "Closed", label: "Closed" }
    ]
  }
]

// modal fields for editing a Survey Series
export const editSeriesFields: ModalField[] = [
  {
    id: "name",
    label: "Title",
    type: "string",
    required: true,
    placeholder: "Enter series title."
  }
]

// Empty fields for confirmation modals (no form inputs needed)
export const confirmDeleteFields: ModalField[] = []

// modal fields for editing a Project Survey, depending on status
export const getEditProjectFields = (currentStatus: "Draft" | "Published" | "Live" | "Closed"): ModalField[] => {
  if (currentStatus === "Closed") {
    return [] // No editing allowed for closed projects
  }

  const fields: ModalField[] = []

  // Term Title - only editable for Draft and Published
  if (currentStatus === "Draft" || currentStatus === "Published") {
    fields.push({
      id: "termTitle",
      label: "Term Title",
      type: "string",
      required: true,
      placeholder: "Enter term title."
    })
  }

  // Course Sections - only editable for Draft and Published
  if (currentStatus === "Draft" || currentStatus === "Published") {
    fields.push({
      id: "courseSections",
      label: "Course Sections Count",
      type: "number",
      required: true,
      placeholder: "Enter number of course sections."
    })
  }

  // Enrollments - always editable (except Closed)
  fields.push({
    id: "enrollments",
    label: "Enrollments Count",
    type: "number",
    required: true,
    placeholder: "Enter number of enrollments."
  })

  // Survey Template - only editable for Draft
  if (currentStatus === "Draft") {
    fields.push({
      id: "surveyTemplate",
      label: "Survey Template",
      type: "string",
      required: false,
      defaultValue: "Default Survey Template",
      placeholder: "Enter survey template."
    })
  }

  // Status - options depend on current status
  let statusOptions: { value: string, label: string }[] = []
  
  if (currentStatus === "Draft") {
    statusOptions = [
      { value: "Published", label: "Published" },
      { value: "Live", label: "Live" },
      { value: "Closed", label: "Closed" }
    ]
  } else if (currentStatus === "Published") {
    statusOptions = [
      { value: "Live", label: "Live" },
      { value: "Closed", label: "Closed" }
    ]
  } else if (currentStatus === "Live") {
    statusOptions = [
      { value: "Closed", label: "Closed" }
    ]
  }

  fields.push({
    id: "status",
    label: "Status",
    type: "select",
    required: true,
    placeholder: "Enter status.",
    options: statusOptions
  })

  return fields
}