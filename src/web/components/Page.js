import AppContext from "@/web/components/AppContext"
import Li from "@/web/components/Li"
import clsx from "clsx"
import Link from "next/link"
import { useContext } from "react"

const variants = {
  small: " max-w-xs",
  default: " max-w-xl",
  large: " max-w-2xl",
}

const Page = (props) => {
  const { title, variant = "default", children } = props

  const {
    state: { session },
    actions: { signOut },
  } = useContext(AppContext)

  return (
    <div>
      <div className="p-4 bg-neutral-100">
        <header className="max-w-xl mx-auto font-medium">
          <div className="flex justify-between">
            <Link href="/">
              <h1 className="hover:text-indigo-500">Pepal Safe</h1>
            </Link>
            <nav>
              <ul className="flex justify-between gap-10">
                {session ? (
                  <>
                    <Li href="/profile">Profile</Li>
                    <Li onClick={signOut} noLink>
                      Sign-out
                    </Li>
                  </>
                ) : (
                  <>
                    <Li href="/signIn">Sign-in</Li>
                    <Li href="/signUp">Sign-up</Li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </header>
      </div>
      <main className={clsx("mx-auto my-10", variants[variant])}>
        <div>
          {title && <h2 className="text-center font-medium mb-5">{title}</h2>}
          {children}
        </div>
      </main>
    </div>
  )
}

export default Page
