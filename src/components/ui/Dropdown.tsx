"use client"
import {useState, useEffect, useRef} from "react"
import NavButton from "./NavButton"

// each item has a label, href is optional for when the type is title, not all items will have a href
export type DropdownItem = {
    label: string
    href?: string
    type: "link" | "title"
}

export type DropdownProps = {
    label: string
    items: DropdownItem[]
}

export default function Dropdown({props}: {props: DropdownProps}) {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !(dropdownRef.current).contains(event.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [open])

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <NavButton onClick={() => setOpen(!open)} label={props.label} dropdown={true} />

            {/* dropdown menu */}
            {open && (
                <div className="absolute left-0 -mt-2 z-10 min-w-max max-w-50 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="py-1">
                        {props.items.map((item, i) => {
                            if (item.type === "link") {
                                return (
                                    <button key={i} className="block text-left px-4 py-2 text-sm w-full hover:bg-blue-100 hover:text-blue-500 hover:cursor-pointer">
                                        {item.label}
                                    </button>
                                )
                            }
                            else {
                                return (
                                    <div key={i} className={`block text-left px-4 py-2 hover:bg-gray-100 hover:cursor-default ${i > 0 ? "border-t border-gray-300" : ""}`}>
                                        <p className="text-xs font-medium">{item.label.toUpperCase()}</p>
                                    </div>
                                    )
                            }
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}