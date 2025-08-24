import Dropdown from "@/components/ui/Dropdown"

import {DropdownProps} from "@/components/ui/Dropdown"
import NavButton from "../ui/NavButton"
import Image from "next/image"

/**
 *  navigation bar
 */

const reportProps: DropdownProps[] = [
    {
        label: "Reports",
        items: [
            {label: "Instructor", type: "title"},
            {label: "My Course", type:'link'},
            {label: "Admin", type: "title"},
            {label: "ClassRanked University", type: "link"},
            {label: "College of Natural Sciences", type: "link"}
        ]
    },
    {
        label: "Settings",
        items: [
            {label: "Institution", type: "title"},
            {label: "Reporting Hierarchy", type: "link"},
            {label: "Academic Units", type: "link"},
            {label: "Data Enhancement", type: "title"},
            {label: "Attributes", type: "link"},
            {label: "Other", type: "title"},
            {label: "Activity Monitor", type: "link"},
        ]
    },
    {
        label: "Survey Setup",
        items: [
            {label: "Survey Distribution", type: "title"},
            {label: "Survey Projects", type: "link"},
            {label: "Survey Templates", type: "link"},
            {label: "Term Setup", type: "title"},
            {label: "Terms", type: "link"},
            {label: "Course Catalog", type: "link"},
            {label: "People", type: "link"},
        ]
    }
]

const accountDropdown: DropdownProps = {
    label: "Account",
    items: [
        {label: "Surveys due", type: "link"},
        {label: "Get Help", type: "link"},
        {label: "Logout", type: "link"}
    ]
}

export default function MenuBar() {
    return (
        <div className="flex items-center justify-between px-4 border-b border-gray-300 bg-white">
            {/* Left side of menu bar */}
            <div className="flex items-center">
                <Image className="inline-block px-2" src="/logo.png" alt="Logo" width={120} height={30} />
                {reportProps.map((dropdownProps, index) => (
                    <Dropdown key={index} props={dropdownProps} />
                ))}
                <NavButton label="Admin" dropdown={false} />
                <NavButton label="Setup Wizard" dropdown={false} />
            </div>


            {/* Right side of menu bar */}
            <div className="flex items-center space-x-4 pr-4">
                <Dropdown props={accountDropdown} />
            </div>
        </div>
    )
}