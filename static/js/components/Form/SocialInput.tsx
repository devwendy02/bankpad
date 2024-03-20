
interface PropsType {
  label?: any
  placeholder?: any
  value: any;
  onChange?: any
  socialName?:string


}

const SocialInput = ({
  label, placeholder, value, onChange, socialName
}: PropsType) => {

  const cls = {
    labelClass: "inline-block px-4 pt-5 pb-4 bg-white rounded-t-md dark:bg-dark-7 dark:text-white",
    inputClass: "w-full px-3 py-3 text-lg dark:text-white placeholder:dark:text-gray-5 dark:bg-dark-3 bg-gray-19",
    wrapClass: "flex items-center bg-white dark:bg-dark-7 py-0.5 pr-0.5",
    markClass: "w-5/12 text-right py-3.5 text-lg dark:text-gray-13 pr-3",
  }

  return (
    <>
      <div className="">
        <div className={cls.labelClass}>{label}</div>
        <div className={cls.wrapClass}>
          <div className={cls.markClass}>
            {socialName}
          </div>
          <div className="w-7/12">
            <input type="text"
              className={cls.inputClass}
              placeholder={placeholder}
              value={value || undefined}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </>


  );
};

export default SocialInput;
