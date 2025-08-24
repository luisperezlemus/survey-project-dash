
import {useState, useEffect} from "react"

export type ToastType = "success" | "error" | "info"

export type ToastProps = {
    id: string
    type: ToastType
    message: string
    duration?: number // in ms
    onClose: (id: string) => void
}

export function Toast({id, type, message, duration = 4000, onClose}: ToastProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [isLeaving, setIsLeaving] = useState(false)


    useEffect(() => {
        setIsVisible(true)

        const timer = setTimeout(() => {
            handleClose()
    }, duration)

        return () => clearTimeout(timer)
    }, [duration])

    const handleClose = () => {
        setIsLeaving(true)
        setTimeout(() => {
            setIsVisible(false)
            onClose(id)
        }, 300)
    }

    const getIcon = () => {
        switch (type) {
            case "success":
                return (
                    <svg fill="white" width={20} height={20} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48ZM364.25,186.29l-134.4,160a16,16,0,0,1-12,5.71h-.27a16,16,0,0,1-11.89-5.3l-57.6-64a16,16,0,1,1,23.78-21.4l45.29,50.32L339.75,165.71a16,16,0,0,1,24.5,20.58Z"/></svg>
                )
            case "error":
                return (
                    <svg className="text-red-400" width={20} height={20} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                )
            case "info":
                return (
                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                )
        }
    }

    const getStyles = () => {
        switch (type) {
            case "success":
                return "bg-green-700 shadow-lg"
            case "error":
                return "bg-red-700 shadow-lg"
            case "info":
                return "bg-blue-700 shadow-lg"
    }
    }


    return (
        <div className={`fixed top-20 right-4 w-60 h-20 gap-4 pt-2 flex items-start rounded-lg transition-all duration-300 ease-in-out ${getStyles()} ${isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0' }`} role="alert">
                    <div className="pl-2">
                        {getIcon()}
                    </div>
                    <div className="flex-1 min-w0">
                        <h4 className="text-sm font-medium text-gray-100 mb-1">{message}</h4>
                    </div>

                    {/* close button */}
                    <button
                        onClick={handleClose}
                        className="flex-shrink-0 ml-4 text-white hover:text-gray-600 transition-colors px-4"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
    )
}

  