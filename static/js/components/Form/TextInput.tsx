import Error from 'components/Widgets/Error';
import { useMemo } from 'react';

interface PropsType {
  label?: any
  placeholder?: any
  value: any;
  onChange?: any
  min?: any
  max?: any
  start_icon?: any
  end_icon?: any
  end_Btn?: any
  type?: string

  isError1?: boolean
  errorMessage1?: string
  isError2?: boolean
  errorMessage2?: string

  isEndIconHidden?: boolean

  editable?: boolean
  disabled?: any
  className?: string
  inputClassName?: string
  size?: string
}

const TextInput = ({
  label, placeholder, value, onChange, min, max, type, start_icon, end_icon,
  isError1, errorMessage1, isError2, errorMessage2, className, inputClassName, end_Btn,
  disabled, size = '', isEndIconHidden,
  editable = true
}: PropsType) => {

  const cls = {
    inputWrapClass: "relative flex items-center w-full",
    inputClass: size === 'md' ? `w-full px-4 py-3 text-lg rounded-md bg-gray-19 dark:bg-dark-3 ${start_icon ? 'pl-9' : ''} dark:text-white placeholder:dark:text-gray-5 ${inputClassName}` : `w-full px-4 py-3 text-lg rounded-md dark:bg-dark-3 ${start_icon ? 'pl-9' : ''} bg-gray-19 dark:text-white placeholder:dark:text-gray-5 ${inputClassName}`,
    startIconClass: "absolute text-base text-gray-400 pointer-events-none left-3 dark:text-gray-14 md:text-lg",
    endIconClass: `absolute pl-2 text-base font-medium bg-gray-19 dark:bg-dark-3 right-3 dark:text-gray-14 md:text-lg ${isEndIconHidden ? 'opacity-0 hover:opacity-100 z-10 transition cursor-pointer' : 'pointer-events-none '}`
  }

  return (
    <>
      <div className={`${cls.inputWrapClass} ${className}`}>
        {start_icon && <span className={cls.startIconClass}>{start_icon}</span>}
        <input
          type={type} id={label}
          value={value || undefined}
          min={min}
          max={max}
          className={cls.inputClass}
          placeholder={placeholder}
          onChange={onChange && editable ? onChange : undefined}
          disabled={disabled}
          readOnly={!Boolean(onChange)}
        />

        {end_icon && <span className={cls.endIconClass}>{end_icon}</span>}

        {end_Btn && <div className='absolute right-2'>{end_Btn}</div>}
        <Error
          text={errorMessage1}
          isError={isError1} />
        <Error
          text={errorMessage2}
          isError={isError2} />
      </div>
    </>


  );
};

export default TextInput;
