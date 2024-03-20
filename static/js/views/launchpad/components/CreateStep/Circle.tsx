import { CheckIcon } from "components/Icons"

interface PropsType {
    label?: string
    isComplete?: boolean
    isActive?: boolean
    noLine?:boolean
    onClick?:any
}
const Circle = ({ label, isComplete, isActive, noLine, onClick }: PropsType) => {
    const contentClass = `relative md:w-1/6 ${isComplete ? 'complete':''} ${isActive ? 'active':''} group shrink-0`
    const wrapClass = "flex flex-col md:items-center lg:inline-flex"
    const circleContentClass = "flex items-center mb-6 w-9 h-9 md:justify-center md:w-10 md:h-10"
    const circleClass = "w-9 xl:w-10 h-9 xl:h-10 bg-gray-19 dark:bg-dark-4 group-[.active]:bg-yellow-2 group-[.active]:dark:bg-yellow-1 group-[.complete]:dark:bg-yellow-1 group-[.complete]:bg-yellow-2 ring-gray-100 rounded-full ring-4 dark:ring-dark-2 flex items-center justify-center relative"
    const lineClass = "w-[calc(100vw/6)] md:w-full bg-gray-200 h-0.5 dark:bg-dark-3 group-[.active]:bg-yellow-2 group-[.active]:dark:bg-yellow-1 group-[.complete]:dark:bg-yellow-1 group-[.complete]:bg-yellow-2 absolute top-4 md:top-5 -mt-px md:translate-x-1/2 ml-4 transition duration-200 ease-in"
    const dotClass = "w-3 h-3 bg-gray-100 dark:bg-dark-1 rounded-full group-[.complete]:hidden"
    const imgClass = "hidden group-[.complete]:inline"
    const labelClass = "dark:text-gray-4 group-[.complete]:dark:!text-gray-4 group-[.active]:text-yellow-2 group-[.active]:dark:text-yellow-1 text-gray-500 text-[9px] sm:text-sm xl:text-base font-semibold break-words text-center hidden md:inline"

    return (
        <>
            <div className={contentClass}>
                <div className={wrapClass}>
                    <div className={circleContentClass} onClick = {onClick}>
                        {/* <!-- Line --> */}
                        {!noLine && <div className={lineClass}></div>}
                        {/* <!-- Circle --> */}
                        <div className={circleClass}>
                            <span className={dotClass}></span>
                            <CheckIcon  className={imgClass}/>
                        </div>
                    </div>
                    <p className={labelClass}>{label}</p>
                </div>
            </div>
        </>

    )
}

export default Circle
