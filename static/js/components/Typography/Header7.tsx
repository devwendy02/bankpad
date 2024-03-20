type PropsType = {
    text ?:string
};
export default function Header7({ text }: PropsType) {
    const titleClass  = "text-base font-medium sm:text-lg lg:text-xl dark:text-white";
    return (
        <h5 className={titleClass}>{text}</h5>
    )
}
