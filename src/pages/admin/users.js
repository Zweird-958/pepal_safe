import React, { useState, useEffect } from "react"
import Page from "../../web/components/Page"
import api from "../../web/services/api"
import Link from "next/link"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"

const Users = () => {
  const [user, setUser] = useState([])
  const [allowed, setAllowed] = useState(false)

  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      try {
        const {
          data: { result },
          status,
        } = await api.get("/user")

        if (status === 401) {
          return
        }

        setUser(result)
        setAllowed(true)
      } catch (err) {
        return
      }
    })()
  }, [router])

  return (
    <Page>
      {allowed ? (
        <div className="grid grid-cols-1 gap-2 p-4 bg-neutral-100 rounded-lg mt-4 shadow-lg shadow-indigo-500">
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
        </div>
      ) : (
        <p className="text-center font-medium text-2xl">ACCÈS NON AUTORISÉ</p>
      )}
    </Page>
  )
}

export default Users
