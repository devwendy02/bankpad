import {PrivateSaleImage} from "components/Icons"
import NoContent from "components/NoContent/index";

export default function PrivateSale() {

  return (
    <>
      <NoContent image={<PrivateSaleImage/>} label="Private Sale coming soon..."/>
    </>
  )
}
