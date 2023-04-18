const ButtonIcon = (props) => {
  const { children, ...otherProps } = props

  return (
    <div className="flex bg-gradient-to-r font from-violet-400 via-indigo-400 to-blue-400 p-0.5 rounded-lg">
      <button className="bg-neutral-100 rounded-md p-0.5" {...otherProps}>
        {children}
      </button>
    </div>
  )
}

export default ButtonIcon
