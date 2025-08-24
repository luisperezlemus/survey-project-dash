

export default function NavButton({label, dropdown, onClick}: {label:string, dropdown: boolean, onClick?: () => void}) {
    return (
        <button onClick={onClick} className="inline-flex items-center gap-1 px-3 py-4 text-md hover:bg-blue-100 hover:text-blue-500 rounded-md font-medium transition-colors duration-200 ease-in-out text-black hover:cursor-pointer">
            {label}
            {dropdown && <svg className="hs-dropdown-open:rotate-180 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg> }
        </button>
    )
}