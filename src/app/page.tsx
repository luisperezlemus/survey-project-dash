"use client"
import Sidebar from "@/components/layout/Sidebar"
import MenuBar from "@/components/layout/MenuBar"
import Header from "@/components/layout/Header"
import ProjectsTable from "@/components/layout/ProjectsTable"

import type {SurveyProject, SurveySeries} from "@/types"
import surveySeriesData from "@/data/surveySeries.json"

import {useState} from "react"

import Modal from "@/components/ui/Modal"
import { Toast, ToastType } from "@/components/ui/Toast"

import { createSeriesFields, createProjectFields, editSeriesFields, confirmDeleteFields, getEditProjectFields } from "@/config/modalFields"


export default function Home() {
  const surveySeries: SurveySeries[] = surveySeriesData as SurveySeries[] // load data

  const [surveySeriesState, setSurveySeriesState] = useState<SurveySeries[]>( // load data into a state
        [...surveySeries].sort((a,b) => a.name.localeCompare(b.name)) // sort alphabetically by name
    )
  
  // keep track of selected series to display on the ProjectsTable
  const [selectedProjectSeriesId, setSelectedProjectSeriesId] = useState<string | null>(surveySeriesState[0]?.id || null)
  const [sidebarKebabId, setSidebarKebabId] = useState<string | null>(null) // keep track of which kebab we're on, used for editing series
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [selectedProjectStatus, setSelectedProjectStatus] = useState<"Draft" | "Published" | "Live" | "Closed" | null>(null)

  // modal states
  const [isCreateSeriesModalOpen, setIsCreateSeriesModalOpen] = useState(false)
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false)
  const [isEditSeriesModalOpen, setIsEditSeriesModalOpen] = useState(false)
  const [isDeleteSeriesModalOpen, setIsDeleteSeriesModalOpen] = useState(false)
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false)

  // we only use one Toast component to communicate any messages
  const [toast, setToast] = useState<{id: string, type: ToastType, message:string } | null>(null)

  // helper function to generate id's for new series and projects
  const generateId = () => `id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

  const showToast = (type: ToastType, message: string) => {
    setToast({
      id: generateId(),
      type,
      message
    })
  }

  // create a series and append it to our state, it should then populate on the sidebar
  const handleCreateSeries = (formData: Record<string, any>) => {
    const newSeries: SurveySeries = {
      id: generateId(),
      name: formData.name,
      projects: [] as SurveyProject[]
    }

    setSurveySeriesState(prev => [...prev, newSeries].sort((a, b) => a.name.localeCompare(b.name)))
    setIsCreateSeriesModalOpen(false)

    showToast("success", "Survey Series Created Successfully!")
    setSelectedProjectSeriesId(newSeries.id) // select the newly created series

    console.log("Created New Series: ", newSeries)
  }

  // edit a survey series
  const handleEditSeries = (formData: Record<string, any>) => {
    if (!sidebarKebabId) {
      console.log("No series selected to edit")
      return
    }

    setSurveySeriesState(prev =>
      prev.map(series =>
        series.id === sidebarKebabId ? { ...series, name: formData.name } : series
      )
    )

    setIsEditSeriesModalOpen(false)
    setSidebarKebabId(null)
    showToast("success", "Survey Series Updated Successfully!")

    console.log("Edited Series: ", formData)
  }

  // delete a survey series
  const handleDeleteSeries = () => {
    if (!sidebarKebabId) {
      console.log("No series selected to delete")
      return
    }

    setSurveySeriesState(prev => prev.filter(series => series.id !== sidebarKebabId))
    
    // If we deleted the currently selected series, select the first available one
    if (selectedProjectSeriesId === sidebarKebabId) {
      const remainingSeries = surveySeriesState.filter(series => series.id !== sidebarKebabId)
      setSelectedProjectSeriesId(remainingSeries.length > 0 ? remainingSeries[0].id : null)
    }

    setIsDeleteSeriesModalOpen(false)
    setSidebarKebabId(null)
    showToast("success", "Survey Series deleted successfully!")
  }

  // create a survey project, which goes inside the selected series
  const handleCreateProject = (formData: Record<string, any>) => {
    if (!selectedProjectSeriesId) {
      console.log("No series selected")
      return
    }

    const newProject: SurveyProject = {
      id: generateId(),
      termTitle: formData.termTitle,
      courseSections: formData.courseSections || 0,
      enrollments: formData.enrollments || 0,
      surveyTemplate: formData.surveyTemplate || "Default Survey Template",
      createdAt: new Date().toISOString(),
      status: formData.status as "Draft" | "Published" | "Live" | "Closed"
    }

    try {
      setSurveySeriesState(prev =>
      prev.map(series => 
        series.id === selectedProjectSeriesId ? {...series, projects: [...series.projects, newProject]} : series
    ))
    } catch (error: unknown) {
      showToast("error", "Failed to create survey project")
    }

    showToast("success", "Survey Project Created Successfully!")

    setIsCreateProjectModalOpen(false)
    console.log("Created New Project: ", newProject)
  }

  // edit a survey project, double check what can be edited with selectedProjectStatus
  const handleEditProject = (formData: Record<string, any>) => {
    if (!selectedProjectId || !selectedProjectStatus ) {
      console.log("No project selected to edit")
      return
    }
    if (selectedProjectStatus == "Closed") {
      return
    }

    console.log(formData)

    setSurveySeriesState(prev =>
      prev.map(series => ({
        ...series,
        projects: series.projects.map(project => {
          if (project.id === selectedProjectId) {
            // Create updated project by iterating through form data
            const updatedProject = { ...project }
            
            // Only update fields that are present in form data
            Object.entries(formData).forEach(([key, value]) => {
              if (value !== undefined && value !== '') {
                // Type-safe field updates
                if (key === 'termTitle' && typeof value === 'string') {
                  updatedProject.termTitle = value
                } else if (key === 'courseSections') {
                  updatedProject.courseSections = Number(value)
                } else if (key === 'enrollments') {
                  updatedProject.enrollments = Number(value)
                } else if (key === 'surveyTemplate' && typeof value === 'string') {
                  updatedProject.surveyTemplate = value
                } else if (key === 'status' && (value === 'Draft' || value === 'Published' || value === 'Live' || value === 'Closed')) {
                  updatedProject.status = value
                }
              }
            })
            
            return updatedProject
          }
          return project
        })
      }))
    )

    setIsEditProjectModalOpen(false)
    setSelectedProjectId(null)
    setSelectedProjectStatus(null)
    showToast("success", "Survey Project Updated Successfully!")

    console.log("Edited Project: ", formData)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <MenuBar />

      {/* main area */}
      <div className="flex px-4 gap-6">

        {/* main section */}
        <div className="flex-1 px-8 py-4 flex flex-col">
          <Header title="Survey Projects" description="All your survey projects are listed below" actionLabel="Create Project" onAction={() => setIsCreateSeriesModalOpen(true)} />         

          <div className="flex flex-1 mt-6 gap-6 overflow-hidden">
            <aside className="w-65 shrink-0 overflow-y-auto">
              <Sidebar 
                surveySeriesState={surveySeriesState} 
                selectedSeriesId={selectedProjectSeriesId} 
                setSelectedSeriesId={setSelectedProjectSeriesId} 
                setKebabId={setSidebarKebabId} 
                setIsEditSeriesModalOpen={setIsEditSeriesModalOpen}
                setIsDeleteSeriesModalOpen={setIsDeleteSeriesModalOpen}
              />
            </aside>

            <div className="flex-1 overflow-y-auto">
              <ProjectsTable seriesName={surveySeriesState.find(series => series.id === selectedProjectSeriesId)?.name || ""} projects={surveySeriesState.find(series => series.id === selectedProjectSeriesId)?.projects} AddTerm={() => setIsCreateProjectModalOpen(true)} selectedProjectId={selectedProjectId} setSelectedProjectId={setSelectedProjectId} setIsEditProjectModalOpen={setIsEditProjectModalOpen} setSelectedProjectStatus={setSelectedProjectStatus} />
            </div>

          </div>
        </div>

      </div>


      {isCreateSeriesModalOpen && <Modal 
        title="Create Survey Series"
        fields={createSeriesFields}
        isOpen={isCreateSeriesModalOpen}
        onSubmit={handleCreateSeries}
        onCancel={() => setIsCreateSeriesModalOpen(false)}
        submitLabel="Create"
        cancelLabel="Cancel"
      /> }

      {isCreateProjectModalOpen && <Modal
        title="Create Survey Project"
        fields={createProjectFields}
        isOpen={isCreateProjectModalOpen}
        onSubmit={handleCreateProject}
        onCancel={() => setIsCreateProjectModalOpen(false)}
        submitLabel="Create"
        cancelLabel="Cancel"
      /> }

      {isEditSeriesModalOpen && <Modal
        title="Edit Survey Series"
        fields={editSeriesFields}
        isOpen={isEditSeriesModalOpen}
        onSubmit={handleEditSeries}
        onCancel={() => setIsEditSeriesModalOpen(false)}
        submitLabel="Save"
        cancelLabel="Cancel"
      /> }

      {isDeleteSeriesModalOpen && <Modal
        title="Delete Survey Series"
        fields={confirmDeleteFields}
        isOpen={isDeleteSeriesModalOpen}
        onSubmit={handleDeleteSeries}
        onCancel={() => setIsDeleteSeriesModalOpen(false)}
        submitLabel="Delete"
        cancelLabel="Cancel"
        confirmationMessage={`Are you sure you want to delete the survey series "${surveySeriesState.find(series => series.id === sidebarKebabId)?.name}"? This action cannot be undone.`}
        destructive={true}
      /> }

      {isEditProjectModalOpen && <Modal
        title="Edit Survey Project"
        fields={getEditProjectFields(selectedProjectStatus!)}
        isOpen={isEditProjectModalOpen}
        onSubmit={handleEditProject}
        onCancel={() => setIsEditProjectModalOpen(false)}
        submitLabel="Save"
        cancelLabel="Cancel"
      /> }

      {toast && (
        <Toast
          id={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

    </div>
  )
}
