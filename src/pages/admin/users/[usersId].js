import ButtonIcon from "@/web/components/ButtonIcon"
import Page from "@/web/components/Page"
import api from "@/web/services/api"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { PencilSquareIcon } from "@heroicons/react/24/solid"
import FormField from "@/web/components/FormField"
import Form from "@/web/components/Form"

const roles = {
  student: "Étudiant(e)",
  teacher: "Intervenant(e)",
  admin: "Administrateur",
}

const initialValues = {
  role: "student",
}

const Usersid = () => {
  const [users, setUser] = useState([])
  const [form, setForm] = useState(false)
  const router = useRouter()
  const { usersId } = router.query

  const handleSubmit = async (values) => {
    await api.patch("/admin", { email: users.email, ...values })

    router.reload(window.location.pathname)
  }

  const handleClick = () => {
    setForm(!form)
  }

  useEffect(() => {
    ;(async () => {
      if (usersId) {
        try {
          const {
            data: { result },
          } = await api.get(`/user/${usersId}`)

          setUser(result)
        } catch (err) {
          return
        }
      }
    })()
  }, [usersId])

  return (
    <Page>
      <div>
        <div className="grid grid-cols-1 gap-2 p-4 bg-neutral-100 rounded-lg mt-4 shadow-lg shadow-indigo-500 text-sm">
          <div className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 p-0.5 rounded-lg">
            <div className="flex justify-between bg-neutral-100 rounded-md px-2 py-1">
              <p>Nom d'utilisateur</p>
              <p>{users.username}</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 p-0.5 rounded-lg">
            <div className="flex justify-between bg-neutral-100 rounded-md px-2 py-1">
              <p>E-mail de l'utilisateur</p>
              <p>{users.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 p-0.5 rounded-lg">
              <div className="flex justify-between bg-neutral-100 rounded-md px-2 py-1 items-center">
                <div className="flex items-center">
                  <p>Rôle de l'utilisateur</p>
                </div>
                <p>{roles[users.role]}</p>
              </div>
            </div>
            <ButtonIcon className="hover:text-blue-500" onClick={handleClick}>
              <PencilSquareIcon className="w-6 p-1" />
            </ButtonIcon>
          </div>
        </div>
        {form && (
          <div className="p-4 max-w-xs mx-auto bg-neutral-100 rounded-lg mt-4 shadow-lg shadow-indigo-500">
            <Form
              title="Changer de rôle"
              desc="Choisissez le nouveau rôle"
              btnDesc="Changer"
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              <FormField as="select" name="role">
                <option value="student">{roles.student}</option>
                <option value="teacher">{roles.teacher}</option>
                <option value="admin">{roles.admin}</option>
              </FormField>
            </Form>
          </div>
        )}
      </div>
    </Page>
  )
}

export default Usersid
