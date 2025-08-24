
import {useState, useEffect} from "react"

type ModalProps = {
    title: string
    fields: ModalField[]
    onSubmit: (data: Record<string, any>) => void
    onCancel: () => void
    isOpen: boolean
    submitLabel?: string
    cancelLabel?: string
    confirmationMessage?: string // Optional confirmation message for dialogs without fields
    destructive?: boolean // Makes the submit button red for destructive actions
}

export type ModalField = {
    id: string
    label: string
    type: "string" | "select" | "number"
    required?: boolean
    placeholder?: string
    defaultValue?: string | number
    options?: { value: string; label: string }[]
}

export default function Modal({ title, fields, onSubmit, onCancel, isOpen, submitLabel = "Create", cancelLabel = "Cancel", confirmationMessage, destructive = false}: ModalProps) {
    if (!isOpen) return null

    const [formData, setFormData] = useState<Record<string, any>>({})

    useEffect(() => {
        const initialData: Record<string, any> = {}
        fields.forEach(field => {
            initialData[field.id] = field.defaultValue || ""
        })
        setFormData(initialData)
    }, [fields])

    const handleInputChange = (fieldId: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [fieldId]: value
        }))
    }

    // escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
            onCancel()
        }
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, onCancel])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 transition-opacity">
            <div className="absolute inset-0 bg-black opacity-25" onClick={onCancel} />

            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="flex items-center justify-between px-4 py-2 pb-4">
                    <h2 className="text-xl font-bold">
                        {title}
                    </h2>
                    <button onClick={onCancel} className="hover:bg-gray-300 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="-0.5 0 25 25" fill="none" className="hover:text-gray-600">
                            <path d="M3 21.32L21 3.32001" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 3.32001L21 21.32" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="px-6 pb-6">
                    {/* Show confirmation message if no fields are provided */}
                    {fields.length === 0 && confirmationMessage && (
                        <div className="mb-6">
                            <p className="text-gray-700">{confirmationMessage}</p>
                        </div>
                    )}

                    {/* Show form fields if provided */}
                    {fields.length > 0 && (
                        <div className="space-y-4 mb-6">
                            {fields.map((field) => (
                                <div key={field.id}>
                                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>

                                    {field.type === "string" && (
                                        <input 
                                            id={field.id}
                                            type="text"
                                            value={formData[field.id] || ""}
                                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                                        />
                                    )}

                                    {field.type === "number" && (
                                        <input
                                            id={field.id}
                                            type="number"
                                            value={formData[field.id] || ""}
                                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            min={0}
                                            className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                                        />
                                    )}

                                    {field.type === "select" && (
                                        <select
                                            id={field.id}
                                            value={formData[field.id] || ""}
                                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                                            required={field.required}
                                            className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                                        >
                                            <option value="" disabled>
                                                {field.placeholder}
                                            </option>
                                            {field.options?.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-end gap-3">
                        <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {cancelLabel}
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 ${
                                destructive 
                                    ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500' 
                                    : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500'
                            }`}
                        >
                            {submitLabel}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}