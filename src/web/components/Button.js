const Button = (props) => {
  const { children, ...otherProps } = props

  return (
    <div className="bg-gradient-to-r font from-violet-400 via-indigo-400 to-blue-400 p-0.5 rounded-lg">
      <button
        className="w-full bg-neutral-100 rounded-md px-2 py-1 font-medium active:bg-transparent active:text-white"
        {...otherProps}
      >
        {children}
      </button>
    </div>
  )
}

export default Button
