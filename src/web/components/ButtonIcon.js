import clsx from "clsx"

const ButtonIcon = (props) => {
  const { className, children, ...otherProps } = props

  return (
    <div className="flex bg-gradient-to-r font from-violet-400 via-indigo-400 to-blue-400 p-0.5 rounded-lg">
      <button
        className={clsx("bg-neutral-100 rounded-md p-0.5", className)}
        {...otherProps}
      >
        {children}
      </button>
    </div>
  )
}

export default ButtonIcon
