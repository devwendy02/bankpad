interface PropsType{
  iconUrl ?: string
  position?:string
}
function Bedge({iconUrl, position}:PropsType ) {

  const contentClass = position === 'up-left'? "absolute top-0 left-0 flex items-center justify-center w-8 h-8 -translate-x-3 -translate-y-3 rounded-full dark:bg-dark-3 mt-2 bg-white":"w-5 h-5 flex items-center justify-center rounded dark:bg-gray-8 bg-gray-19 absolute right-0 bottom-0 translate-x-2.5 translate-y-2.5"
  const iconClass = position === 'up-left' ? "w-4 ":"w-4"
  return (
    <div className={contentClass}>
      {iconUrl ?
      <img src={iconUrl} alt="" className={iconClass}/>:
      <div className="text-white dark:text-gray-10">
        <img src={iconUrl} alt=""/>
    </div>
      }
  </div>
  )

}

export default Bedge;

