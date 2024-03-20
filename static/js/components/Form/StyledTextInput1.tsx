import Link from 'components/Butttons/Link';
import { Plus } from 'components/Icons';
import Label1 from 'components/Typography/Label1';
import Tiny from 'components/Typography/Tiny';
import Error from 'components/Widgets/Error';
import TextInput from './TextInput';

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

  className?: string
  href?: string
  linkLabel?: any
  low_right_text?: any
  low_right_value?: any
  low_left_text?: any
  size ?:string
}

const StyledTextInput1 = ({
  label, placeholder, value, onChange, min, max, type, start_icon, end_icon,
  isError1, errorMessage1, errorMessage2, isError2,
  disabled, className, linkLabel, href, low_left_text, low_right_text, low_right_value, size,
  editable = true
}: PropsType) => {

  const cls = {
    topWrapClass: "flex items-center justify-between",
    bottomWrapClass: "flex flex-wrap gap-1.5 justify-between mt-2",
    bottomLabelClass: "flex flex-wrap gap-1.5 justify-between mt-2"
  }

  return (
    <>

      <div className={className}>
        <div className={cls.topWrapClass}>
          <Label1
            text={label}
          />
          <Link
            href={href}
            label={linkLabel}
          />
        </div>
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
          isError1 = {isError1}
          isError2 = {isError2}
          errorMessage1={errorMessage1}
          errorMessage2={errorMessage2}
          size = {size}
        />

        <div className={cls.bottomWrapClass}>
          <div className="flex items-center">
            <Plus className="opacity-70 dark:opacity-100" />
            <Tiny className="text-sm ml-2" text={low_left_text} />
        </div>
          <Tiny subText={low_right_text} text={low_right_value} subTextClassName="text-sm mr-2"/>
      </div>
      </div>
    </>
  );
};

export default StyledTextInput1;
