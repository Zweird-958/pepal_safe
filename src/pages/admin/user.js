import React, { useState, useEffect } from "react"
import Page from "../../web/components/Page"
import api from "../../web/services/api"
import Link from "next/link"
import { InformationCircleIcon } from "@heroicons/react/24/outline"

const User = () => {
  const [user, setUser] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const {
          data: { result },
        } = await api.get("/user")
        setUser(result)
      } catch (err) {
        return
      }
    })()
  }, [])

  return (
    <Page>
      {user.map((user) => {
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
    </Page>
  )
}

export default User
