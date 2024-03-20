
type PropsType = {
    text ?:string
};
export default function Header1({ text }: PropsType) {
    const titleClass = "text-2xl font-semibold md:text-4xl xl:text-44px text-slate-900 dark:text-white"
    return (
        <h1 className={titleClass}>{text}</h1>
    )
}
