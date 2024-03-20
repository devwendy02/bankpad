
type PropsType = {
    text ?:string
};
export default function Header4({ text }: PropsType) {
    const titleClass  = "text-xl font-medium dark:text-white";
    return (
        <h5 className={titleClass}>{text}</h5>
    )
}
