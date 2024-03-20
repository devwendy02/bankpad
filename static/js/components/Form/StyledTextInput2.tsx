import Link from 'components/Butttons/Link';
import { Plus } from 'components/Icons';
import Label1 from 'components/Typography/Label1';
import Tiny from 'components/Typography/Tiny';
import Error from 'components/Widgets/Error';
import TextInput from './TextInput';
import Connector from 'components/Widgets/Connector';

interface PropsType {
  label?: any
  placeholder?: any
  value: any;
  onChange?: any
  min?: any
  max?: any
  start_icon?: any
  end_icon?: any
  type?: string

  isError1?: boolean
  errorMessage1?: string
  isError2?: boolean
  errorMessage2?: string

  editable?: boolean
  disabled?: any
  isEndIconHidden ?:boolean
  className?: string
  low_text?: any
  symbol?: any
  secondValeu?: any
  size?: string

}

const StyledTextInput2 = ({
  label, placeholder, value, onChange, min, max, type, start_icon, end_icon,
  isError1, errorMessage1, errorMessage2, isError2,
  disabled, className, low_text, symbol, secondValeu, size, isEndIconHidden,
  editable = true
}: PropsType) => {

  const cls = {
    topWrapClass: "grid mb-2 sm:grid-cols-12",
    bottomWrapClass: "flex flex-wrap gap-1.5 justify-between mt-2",
    bottomLabelClass: "mt-2 text-sm text-gray-400 font-roboto dark:text-gray-4/90",
    leftClass: "sm:col-span-4 md:col-span-3",
    rightClass: "sm:col-span-6 md:col-span-7"
  }

  return (
    <>
      <div className={className}>
        <Label1
          text={label}
        />
        <div className={cls.topWrapClass}>
          <div className={cls.leftClass}>
            <TextInput
              type={type}
              value={value}
              min={min}
              max={max}
              placeholder={placeholder}
              onChange={onChange && editable ? onChange : undefined}
              disabled={disabled}
              start_icon={start_icon}
              end_icon={end_icon}
              isError1={isError1}
              isError2={isError2}
              errorMessage1={errorMessage1}
              errorMessage2={errorMessage2}
              size={size}
            />
          </div>
          <Connector type='horizontal' icon='equal' />

          <div className={cls.rightClass}>
            <TextInput
              type={'text'}
              value={secondValeu}
              disabled={disabled}
              editable={false}
              end_icon={symbol}
              size={size}
              isEndIconHidden = {isEndIconHidden}
            />
          </div>
        </div>
        <p className={cls.bottomLabelClass}>{low_text}</p>



      </div>

    </>


  );
};

export default StyledTextInput2;
