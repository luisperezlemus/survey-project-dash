import type { SurveyProject} from "@/types"
import Kebab from "@/components/ui/Kebab"


type ProjectsTableProps = {
    seriesName: string
    projects?: SurveyProject[]
    AddTerm: () => void
    selectedProjectId: string | null
    setSelectedProjectId: (id: string | null) => void
    setIsEditProjectModalOpen: (isOpen: boolean) => void
    setSelectedProjectStatus: (status: "Draft" | "Published" | "Live" | "Closed" | null) => void
}

export default function ProjectsTable({seriesName, projects, AddTerm, selectedProjectId, setSelectedProjectId, setIsEditProjectModalOpen, setSelectedProjectStatus }: ProjectsTableProps) {

    if (projects && projects.length !== 0) return (
        <div className="bg-white border-gray-200 border rounded-lg">
            <div className="flex items-center justify-between px-6 py-8 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">{seriesName} ({projects?.length || 0})</h2>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded bg-white hover:bg-gray-100 cursor-pointer" onClick={AddTerm}>
                    Add Term
                </button>
            </div>

            {/* table */}
            <div className="flex flex-col h-full">
                <div className="flex-shrink-0">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="w-1/6 px-4 py-5 text-left text-sm text-gray-600">Term</th>
                                <th className="w-1/6 px-4 py-5 text-left text-sm text-gray-600 relative">
                                    <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-gray-200"></div>
                                    Survey Template
                                </th>
                                <th className="w-1/6 px-4 py-5 text-left text-sm text-gray-600 relative">
                                    <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-gray-200"></div>
                                    Courses Section
                                </th>
                                <th className="w-1/6 px-4 py-5 text-left text-sm text-gray-600 relative">
                                    <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-gray-200"></div>
                                    Enrollments
                                </th>
                                <th className="w-1/6 px-4 py-5 text-left text-sm text-gray-600 relative">
                                    <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-gray-200"></div>
                                    Status
                                </th>
                                <th className="w-1/6 px-4 py-5 text-left text-sm text-gray-600 relative">
                                    <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-gray-200"></div>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/* scollable table body */}
                <div className="overflow-y-auto max-h-100">
                    <table className="w-full table-fixed">
                        <tbody className="divide-y divide-gray-200 ">
                            {projects?.map((project) => (
                                <tr key={project.id} className="bg-white hover:bg-gray-50">
                                    <td className="w-1/6 px-4 py-4 text-sm overflow-hidden whitespace-nowrap">{project.termTitle}</td>
                                    <td className="w-1/6 px-4 py-4 text-sm text-gray-500 overflow-hidden whitespace-nowrap">{project.surveyTemplate}</td>
                                    <td className="w-1/6 px-4 py-4 text-sm text-gray-500 overflow-hidden whitespace-nowrap">{project.courseSections}</td>
                                    <td className="w-1/6 px-4 py-4 text-sm text-gray-500 overflow-hidden whitespace-nowrap">{project.enrollments}</td>
                                    <td className="w-1/6 px-4 py-4 text-sm text-gray-500 overflow-hidden whitespace-nowrap">
                                        <span className="px-4 py-2 text-sm rounded-full border border-gray-300 cursor-default">
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="w-1/6 px-4 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="text-sm font-bold text-blue-600 cursor-pointer hover:underline" onClick={() => {
                                                if (project.status === "Closed") {
                                                    return
                                                }
                                                setSelectedProjectId(project.id)
                                                setSelectedProjectStatus(project.status)
                                                setIsEditProjectModalOpen(true)
                                            }}>
                                                Edit
                                            </button>
                                            <button className="cursor-pointer">
                                                <Kebab width={20} height={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

    else return (
        <div className="bg-white border-gray-200 border rounded-lg">
            <div className="flex items-center justify-between px-6 py-8 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">{seriesName} (0)</h2>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded bg-white hover:bg-gray-100 cursor-pointer" onClick={AddTerm}>
                    Add Term
                </button>
            </div>

            <div className="h-100 flex flex-col items-center justify-center text-center">
                <p className="text-lg font-bold">Start by creating a distribution plan</p>
                <p>Plan, coordinate, and execute Surveys by creating a Survey Project.</p>
            </div>
        </div>
    )
}