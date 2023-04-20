import AppContext from "@/web/components/AppContext"
import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import Page from "@/web/components/Page"
import api from "@/web/services/api"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"

const initialValues = {
  username: "",
  email: "",
  password: "",
  role: "",
}

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
        } = await api.get(`/role/${session.userId}`)

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

  const handleSubmit = async (values) => {
    await api.post("/users", values)
  }

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
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit}
        btnDesc="AJOUTER"
      >
        <FormField name="username" placeholder="username" />
        <FormField name="email" placeholder="email" />
        <FormField name="password" placeholder="password" />
        <FormField name="role" placeholder="role" />
      </Form>
    </Page>
  )
}

export default Users
