import { InformationCircleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useEffect, useState } from "react"
import Page from "../../web/components/Page"
import api from "../../web/services/api"
import MainDiv from "@/web/components/MainDiv"

const Users = () => {
  const [user, setUser] = useState([])
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const {
          data: { result },
          status,
        } = await api.get(`/users`)

        if (status === 401) {
          return
        }

        setUser(result)
        setAllowed(true)
      } catch (err) {
        return
      }
    })()
  }, [])

  return (
    <Page>
      {allowed ? (
        <MainDiv>
          {user &&
            user.map((user) => {
              return (
                <div
                  key={user._id}
                  className="bg-gradient-to-r font from-violet-400 via-indigo-400 to-blue-400 p-0.5 rounded-lg"
                >
                  <div className="flex justify-between bg-neutral-100 rounded-md px-2 py-1 items-center">
                    <div>
                      <p className="text-sm font-medium">{user.username}</p>
                      <p className="text-xs">{user.email}</p>
                    </div>
                    <Link href={`/admin/users/${user._id}`}>
                      <InformationCircleIcon className="w-5 hover:text-blue-500"></InformationCircleIcon>
                    </Link>
                  </div>
                </div>
              )
            })}
        </MainDiv>
      ) : (
        <p className="text-center font-medium text-2xl">ACCÈS NON AUTORISÉ</p>
      )}
    </Page>
  )
}

export default Users
