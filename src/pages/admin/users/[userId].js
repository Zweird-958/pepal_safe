import Page from "@/web/components/Page"
import api from "@/web/services/api"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Usersid = () => {
  const [users, setUser] = useState([])
  const router = useRouter()
  const { userId } = router.query

  useEffect(() => {
    ;(async () => {
      if (userId) {
        try {
          const {
            data: { result },
          } = await api.get(`/user/${userId}`)

          setUser(result)
        } catch (err) {
          return
        }
      }
    })()
  }, [userId])

  return (
    <Page>
      <h1>{users.username}</h1>
      <h2>{users.email}</h2>
      <p>{users.role}</p>
    </Page>
  )
}

export default Usersid
