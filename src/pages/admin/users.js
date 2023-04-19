import AppContext from "@/web/components/AppContext"
import Page from "@/web/components/Page"
import api from "@/web/services/api"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"

const Users = () => {
  const [users, setUsers] = useState([])
  const router = useRouter()

  const {
    state: { session },
  } = useContext(AppContext)

  useEffect(() => {
    ;(async () => {
      if (session) {
        const {
          data: { result },
        } = await api.get(`/users/${session.userId}`)

        if (result !== "admin") {
          router.push("/")

          return
        } else {
          const {
            data: { result },
          } = await api.get("/users")

          setUsers(result)
        }
      }
    })()
  }, [session])

  return (
    <Page>
      <div className="flex justify-center flex-col">
        {users.map(({ _id, username, email }) => (
          <div key={_id} className="flex flex-col items-center">
            <p>{username}</p>
            <p>{email}</p>
          </div>
        ))}
      </div>
    </Page>
  )
}

export default Users
