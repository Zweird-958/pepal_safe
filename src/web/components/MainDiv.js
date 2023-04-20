import clsx from "clsx"

const MainDiv = (props) => {
  const { className, children, ...otherProps } = props

  return (
    <div
      className={clsx(
        "p-4 bg-neutral-100 rounded-lg mt-4 shadow-lg shadow-indigo-500",
        className
      )}
      {...otherProps}
    >
      {children}
    </div>
  )
}

export default MainDiv
