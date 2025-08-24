"use client"
import type {SurveyProject, SurveySeries} from "@/types"
import {useState, useEffect} from "react"
import SearchBar from "@/components/ui/SearchBar"
import Kebab from "@/components/ui/Kebab"

/**
 * Sidebar component which displays list of Survey Series
 */
export default function Sidebar({ surveySeriesState, selectedSeriesId, setSelectedSeriesId, setKebabId, setIsEditSeriesModalOpen, setIsDeleteSeriesModalOpen }: { surveySeriesState: SurveySeries[], selectedSeriesId: string | null, setSelectedSeriesId: (id: string) => void, setKebabId: (id: string | null) => void, setIsEditSeriesModalOpen: (isOpen: boolean) => void, setIsDeleteSeriesModalOpen: (isOpen: boolean) => void }) {
    const [searchQuery, setSearchQuery] = useState("")

    const [openKebabId, setOpenKebabId] = useState<string | null>(null)
    const [hoveredSeriesId, setHoveredSeriesId] = useState<string | null>(null)

    // Filter survey series based on search query
    const filteredSurveySeriesState = surveySeriesState.filter(series =>
        series.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    )

    // handles dropdown visibility, close the dropdown when we click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Check if the click is outside any dropdown
            const clickedElement = event.target as Element
            const isInsideDropdown = clickedElement.closest('.dropdown-container')
            
            if (!isInsideDropdown) {
                setOpenKebabId(null)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // set kebabId/dropdown to the one that was clicked, if it was the same kebab, remove dropdown
    const handleKebabClick = (id: string) => {
        if(id === openKebabId) {
            setOpenKebabId(null) // toggle off if clicking on the same kebab
            console.log("removed kebab from ", id, "previously open kebab was, ", openKebabId)
        } else {
            console.log("opened kebab for ", id, 'previously open kebab was, ', openKebabId)
            setOpenKebabId(id)
        }
    }

    // visible is being survey is being hovered or if kebab/dropdown is open
    const isKebabVisible = (id: string) => {
        return hoveredSeriesId === id || openKebabId === id
    }

    return (
        <div className="border-gray-300 flex flex-col mx-1 pt-1">
            {/* search bar */}
            <div className="mb-2">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>

            <div className="flex-1 flex-col overflow-y-auto overflow-visible max-h-119.5">
                <ul className="space-y-2">
                    {/* Filter and display survey series based on search query */}
                    {filteredSurveySeriesState.length > 0 ? (
                        filteredSurveySeriesState.map(series => (
                            <li 
                                key={series.id} 
                                className={`px-2 py-2 text-sm cursor-pointer hover:bg-blue-100 rounded hover:text-blue-500 truncate flex items-center justify-between ${series.id === selectedSeriesId && "bg-blue-100 text-blue-500 font-medium"}`}
                                onClick={() => setSelectedSeriesId(series.id)}
                                onMouseEnter={() => setHoveredSeriesId(series.id)}
                                onMouseLeave={() => setHoveredSeriesId(null)}
                            >
                                <span>{series.name}</span> 

                                <div className="dropdown-container">
                                    <button 
                                        className={`rounded cursor-pointer transition-opacity ${
                                            isKebabVisible(series.id) ? "opacity-100" : "opacity-0"}`}
                                        onClick={(e) => {
                                            e.stopPropagation() // Prevent triggering the li onClick
                                            handleKebabClick(series.id)
                                        }}
                                    >
                                        <Kebab width={20} height={20} />
                                    </button>

                                    {openKebabId && openKebabId === series.id && (
                                        <div className="absolute inline-block left-70 mt-6 w-28 bg-white border border-gray-300 rounded shadow-lg z-10">
                                            <ul className="py-1">
                                                <li className="px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={(e) => {
                                                    e.stopPropagation()
                                                    setKebabId(series.id)
                                                    setIsEditSeriesModalOpen(true)
                                                    setOpenKebabId(null)
                                                }}>Edit</li>
                                                <li className="px-4 py-1 text-sm hover:bg-gray-100 cursor-pointer text-red-500" onClick={(e) => {
                                                    e.stopPropagation()
                                                    setKebabId(series.id)
                                                    setIsDeleteSeriesModalOpen(true)
                                                    setOpenKebabId(null)
                                                }}>Delete</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))
                    ) : (
                        // Show "No results" message when search yields no matches
                        searchQuery && (
                            <li className="px-2 py-2 text-sm text-gray-500 text-center">
                                No survey series found matching "{searchQuery}"
                            </li>
                        )
                    )}
                </ul>
            </div>
        </div>
    )
}