
type PropsType = {
    text?: string
    small?:boolean
    big?:boolean
    medium?:boolean
};
export default function P({ text, small, big, medium }: PropsType) {
    return (
        small ? <p className="text-sm text-gray-400 dark:text-gray-4">{text}</p>:
        medium? <p className="text-base text-gray-400 dark:text-gray-4">{text}</p>:
        big? <p className="text-xl text-center dark:text-gray-4 mt-5">{text}</p>:
        <p className="mb-6 text-gray-500 lg:text-base dark:text-gray-4">{text}</p>
    )
}
