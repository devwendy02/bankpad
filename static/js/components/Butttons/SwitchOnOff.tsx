import { useMemo } from "react"

interface PropsType {
  label?: string
  onChange?: any
  switched?: boolean
}
function SwitchOnOff({ label, onChange, switched }: PropsType) {
  const contentClass = "flex items-center"
  const wrappClass = "relative inline-flex items-center w-18 h-8 align-middle transition duration-200 ease-in select-none"
  const inputClass = "absolute left-0 block w-6 h-6 mx-1 transition-all duration-100 bg-gray-200 rounded-full appearance-none cursor-pointer dark:bg-white peer checked:left-8 checked:dark:bg-yellow-1 checked:bg-yellow-2"
  const trackClass = "overflow-hidden rounded-full h-8 w-18 bg-white dark:bg-dark-5 peer-checked:dark:bg-dark-4 cursor-pointer after:content-['ON'] before:content-['OFF'] dark:text-white after:absolute after:left-2 before:absolute before:right-1 flex items-center text-base peer-checked:text-yellow-2 peer-checked:dark:text-yellow-1 after:hidden peer-checked:after:inline before:inline peer-checked:before:hidden"
  const isChecked = useMemo(() => switched, [switched])


  const handleChange = (event) => {
    if (onChange) onChange(event.target.checked);
  };

  return (
    <>

      <div className={contentClass}>
        <div className={wrappClass}>
          <input
            type="checkbox"
            checked={!!isChecked}
            name="toggle"
            id={`advanceToggle${label}`}
            className={inputClass}
            readOnly onClick={handleChange}
          />
          <label htmlFor={`advanceToggle${label}`}
            className={trackClass}></label>
        </div>
      </div>

    </>
  )

}

export default SwitchOnOff;

