const CheckboxInput = (props) => {
  const { label, children, ...otherProps } = props

  return (
    <div className="grid grid-cols-1 gap-1 w-full">
      {label ? (
        <div className="flex p-2 items-center gap-1">
          <input className="" {...otherProps}></input>
          <label>{label}</label>
        </div>
      ) : (
        <input
          className="w-full px-2 py-1 bg-neutral-100 rounded-md text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          {...otherProps}
        >
          {children}
        </input>
      )}
    </div>
  )
}

export default CheckboxInput
