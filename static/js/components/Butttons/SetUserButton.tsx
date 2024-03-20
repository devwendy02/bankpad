import { WalletIcon } from "components/Icons"

interface PropsType {
  onClick?: any
}
function SetUserButton({ onClick }: PropsType) {

  return (
    <>
      <button aria-label="Set deployer wallet" data-microtip-position="top-left" role="tooltip"
        className="px-3 py-2 border rounded-md border-gray-50 dark:border-dark-1 shrink-0 dark:bg-dark-4 bg-gray-100 dark:text-gray-14"
        onClick={onClick}
      >
        <WalletIcon />
      </button>
    </>
  )

}

export default SetUserButton;
