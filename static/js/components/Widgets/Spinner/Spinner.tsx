import Tiny from 'components/Typography/Tiny';
import './spinner.scss';

export default function Spinner({ size }) {
  return (
    <div className="flex items-center flex-col mt-5">
      <div
        className={`flex justify-center items-center bg-transparent `}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <div
          className={`three-quarter-spinner`}
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      </div>
      <Tiny text="Loading..." className="dark:text-yellow-1 text-yellow-2 mt-1" />
    </div>
  )
}
