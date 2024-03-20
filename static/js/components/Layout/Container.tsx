
export default function Container(props) {
  return (
    <div className="px-6 mx-auto max-w-screen-2xl lg:px-10 pt-7">
      {props?.children}
    </div>
  )
}

