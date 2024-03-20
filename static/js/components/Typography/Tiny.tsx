
type PropsType = {
    text?: any
    subText?: string
    className?:string
    subTextClassName?:string
};
export default function Tiny({ text, subText, className, subTextClassName }: PropsType) {
    return (
        <span className={`dark:text-white ${className || ''}`}>
            {subText && <span className={`text-sm text-gray-400 dark:text-gray-4 ${subTextClassName || ''}`}>{subText}</span>}
            {text}
        </span>
    )
}
