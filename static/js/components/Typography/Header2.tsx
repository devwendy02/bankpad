
type PropsType = {
    text ?:string
};
export default function Header2({ text }: PropsType) {
    const titleClass  = "mb-3 sm:mb-2 text-2xl font-semibold truncate sm:text-3xl md:text-4xl xl:text-40 dark:text-white";
    return (
        <h1 className={titleClass}>{text}</h1>
    )
}
