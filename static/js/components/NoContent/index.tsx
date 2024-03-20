interface PropsType {
    image?: any
    label?: string
}

function Index({ image, label }: PropsType) {

    return (
        <>
            <div className="flex items-center flex-col my-36">
                <div className="w-55 max-w-full">{image}</div>
                <p className="text-xl font-medium text-center dark:text-gray-4 mt-6 pt-6">{label}</p>
            </div>
        </>
    )
}

export default Index;

