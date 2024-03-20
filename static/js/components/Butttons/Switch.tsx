import { useMemo } from "react"

interface PropsType {
  label?: string
  onChange?: any
  switched?: boolean
  noBorder?: boolean
  id?: string
}
function Switch({ label, onChange, switched, noBorder, id }: PropsType) {
  const contentClass = noBorder ? "relative inline-flex items-center h-5 mr-2 align-middle transition duration-200 ease-in select-none w-9" : "flex items-center mt-1 sm:mt-0"
  const wrappClass = "relative inline-flex items-center h-5 align-middle transition duration-200 ease-in select-none sm:mr-2 w-9"
  const inputClass = noBorder ? "absolute block w-4 h-4 rounded-full bg-gray dark:bg-white appearance-none checked:bg-yellow-2 cursor-pointer mx-0.5 peer left-0 checked:left-4 checked:dark:bg-yellow-1 transition-all duration-100" : "absolute block w-4 h-4 rounded-full bg-gray dark:bg-white appearance-none cursor-pointer mx-0.5 peer left-0 checked:left-4 checked:dark:bg-yellow-1 checked:bg-yellow-2 transition-all duration-100"

  const trackClass = "block h-5 overflow-hidden bg-white dark:bg-dark-5 border rounded-full cursor-pointer w-9"
  const labelClass = "hidden text-sm font-medium text-slate-800 dark:text-white sm:inline-block"
  const isChecked = useMemo(() => switched, [switched])

  const handleChange = (event) => {
    if (onChange) onChange(event.target.checked);
  };

  return (
    <>
      {noBorder ?
        <div className={contentClass}>
          <input name="toggle" id={id} type="checkbox" checked={!!isChecked} className={inputClass} readOnly onClick={handleChange} />
          <label htmlFor={id}
            className="block h-5 overflow-hidden border rounded-full cursor-pointer w-9 bg-white dark:bg-dark-5"></label>
        </div> :
        <div className={contentClass}>
          <div className={wrappClass}>
            <input type="checkbox" checked={!!isChecked} name="toggle" id={`toggle${label}`} className={inputClass} readOnly onClick={handleChange} />
            <label htmlFor={`toggle${label}`} className={trackClass}></label>
          </div>
          <label className={labelClass}>{label}</label>
        </div>}
    </>
  )
}

export default Switch;

