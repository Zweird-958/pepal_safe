import AppContext from "@/web/components/AppContext"
import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import Page from "@/web/components/Page"
import api from "@/web/services/api"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import * as yup from "yup"

const initialValues = {
  username: "",
  email: "",
  password: "",
  role: "student",
}

const validationSchema = yup.object().shape({
  username: yup.string().required("Username est un champ requis."),
  email: yup
    .string()
    .email("Saisissez un e-mail valide.")
    .required("E-mail est un champ requis."),
  password: yup
    .string()
    .min(8, "Minimum 8 caractères.")
    .required("Mot de passe est un champ requis."),
})

const CreateUser = () => {
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
        }
      }
    })()
  }, [router, session])

  const handleSubmit = async (values) => {
    await api.post("/users", values)
  }

  return (
    <Page variant="small">
      <div className="p-4 bg-neutral-100 rounded-lg mt-4 shadow-lg shadow-indigo-500">
        <Form
          title="Ajouter un utilisateur"
          desc="Saisissez tous les champs."
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          btnDesc="Ajouter"
        >
          <FormField name="username" placeholder="Jean" />
          <FormField name="email" placeholder="jean@supdevinci-edu.fr" />
          <FormField name="password" placeholder="Mot de passe" />
          <FormField as="select" name="role">
            <option value="student">Étudiant(e)</option>
            <option value="teacher">Intervenant(e)</option>
          </FormField>
        </Form>
      </div>
    </Page>
  )
}

export default CreateUser
