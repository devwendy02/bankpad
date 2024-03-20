
type PropsType = {
    text ?:string
};
export default function Header3({ text }: PropsType) {
    const titleClass  = "mb-3 font-medium text-2xl dark:text-white";
    return (
        <h4 className={titleClass}>{text}</h4>
    )
}
