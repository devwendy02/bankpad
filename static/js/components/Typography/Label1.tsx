
type PropsType = {
    text ?:string
    size?:string
};
export default function Label1({ text, size='md' }: PropsType) {
    const cls  = size === 'md'? "block mb-2 text-base dark:text-white":"block mb-1.5 text-base font-roboto dark:text-white";
    return (
        <label htmlFor={text} className={cls}>{text}</label>
    )
}
