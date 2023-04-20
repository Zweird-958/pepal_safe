const MainDiv = (props) => {
  const { children } = props

  return (
    <div className="grid grid-cols-1 gap-2 p-4 bg-neutral-100 rounded-lg mt-4 shadow-lg shadow-indigo-500">
      {children}
    </div>
  )
}

export default MainDiv
