
type PropsType = {
    text?: string
    className?:string
    noBorder?:boolean
};
export default function TinyRed({ text, className, noBorder }: PropsType) {
    return (
        <p className={`${noBorder ? '' : 'mb-3 '}text-sm text-red-1 ${className || ''}`}>{text}</p>
    )
}
