
type PropsType = {
  text?: string
  span?: string
};
export default function Header6({ text, span }: PropsType) {
  const titleClass = "mb-2 text-xl font-medium md:text-2xl dark:text-white";
  return (
    <h4 className={titleClass}>
      {text} <span className="font-bold text-yellow-2 dark:text-yellow-1">{span}</span></h4>
  )
}
