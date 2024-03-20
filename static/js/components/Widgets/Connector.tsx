import { ArrowRight, BigPlus, Equal } from "components/Icons"

interface PropsType {
  type?: string
  icon?: string
  className?:string
  noLine?:boolean
  lineSize?: string
}
function Connector({ type, icon, className, noLine, lineSize }: PropsType) {

  const contentClass = "flex flex-col items-center "
  const lineClass1 = "w-px h-6 sm:h-3 xl:h-6 2xl:h-3 dark:bg-gray-15/35 bg-gray-19"
  const lineClass2 = `w-px h-2 sm:grow sm:w-auto sm:h-px dark:bg-gray-15/35 bg-gray-19 ${noLine ? 'hidden sm:flex':''} ${lineSize}`
  const iconClass = `flex items-center justify-center border rounded-full ${noLine ? 'w-12 h-12':'w-14 h-14'} sm:w-14 sm:h-14 shrink-0 dark:border-gray-15/35 border-gray-19 `

  return (
    <>
      {
        type === 'vertical' &&


        <div className={`${contentClass} -mt-7 ${className}`}>
          <div className={lineClass1}></div>
          <div className={iconClass}>
            {icon === 'plus' && <BigPlus className="text-black dark:text-white"/>}
          </div>
          <div className={lineClass1}></div>
        </div>
      }
      {type === 'horizontal' &&
      <div className={`${contentClass} sm:col-span-2 sm:flex-row ${className}`}>
      <div className={lineClass2}></div>
      <div  className={iconClass}>
      {icon === 'equal' && <Equal/>}
      {icon === 'plus' && <BigPlus className="text-black dark:text-white"/>}
      {icon === 'right' && <ArrowRight className = {`${noLine ? 'rotate-0':'rotate-90 sm:rotate-0'} dark:text-white`}/>}

      </div>
      <div className={lineClass2}></div>
  </div>

      }
    </>
  )

}

export default Connector;

