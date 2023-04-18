const Safe = (props) => {
  const { session } = props

  return (
    <div>
      <p>Hello {session.userUsername}</p>
    </div>
  )
}

export default Safe
