import {useState} from "react"

type HeaderProps = {
    title: string
    description: string
    actionLabel: string
    onAction?: () => void
}

export default function Header({title, description, actionLabel, onAction}: HeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6 w-full">
            <div>
                {/* breadcrumb */}
                <div className="text-sm font-medium text-blue-500 mb-4">{title}</div> 
                
                <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
                <p className="mt-1 text-sm text-gray-600">{description}</p>
            </div>
            
            <button
                onClick={onAction} 
                className="rounded-md bg-blue-500 px-4 py-2 mt-6 text-white hover:cursor-pointer hover:bg-blue-600"
                >
                {actionLabel}                
            </button>
        </div>
    )
}