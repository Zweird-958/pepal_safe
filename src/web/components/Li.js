import Link from "next/link"

const Li = (props) => {
  const { noLink, onClick, href, children } = props

  return (
    <li className="hover:text-indigo-500">
      {noLink ? (
        <button onClick={onClick}>{children}</button>
      ) : (
        <Link href={href}>{children}</Link>
      )}
    </li>
  )
}

export default Li
