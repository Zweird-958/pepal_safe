import AppContext from "@/web/components/AppContext"
import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import Page from "@/web/components/Page"
import api from "@/web/services/api"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import * as yup from "yup"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

const initialValues = {
  username: "",
  email: "",
  password: "",
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

const SignUp = () => {
  const router = useRouter()

  const {
    actions: { signIn },
  } = useContext(AppContext)

  const [countUsers, setcountUsers] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const {
          data: { result },
        } = await api.get("/countUsers")
        setcountUsers(result)
      } catch (err) {
        return
      }
    })()
  }, [])
  const handleSubmit = async (values) => {
    await api.post("/sign-up", values)

    try {
      const [err] = await signIn(values)

      if (!err) {
        router.push("/")

        return
      }
    } catch (err) {
      return
    }
  }

  return (
    <Page variant="small">
      <div className="p-4 bg-neutral-100 rounded-lg mt-4 shadow-lg shadow-indigo-500">
        <Form
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
          title="Sign-up"
          desc="Créeons votre compte. "
          btnDesc="Créer compte"
        >
          {!countUsers && (
            <div className="flex items-center gap-1">
              <ExclamationTriangleIcon className="w-5 text-red-500"></ExclamationTriangleIcon>
              <p className="text-sm text-red-500 truncate">
                Le prochain compte sera administrateur
              </p>
            </div>
          )}

          <FormField name="username" placeholder="devLife01"></FormField>
          <FormField
            name="email"
            type="email"
            placeholder="something@supdevinci.fr"
          ></FormField>
          <FormField
            name="password"
            type="password"
            placeholder="securePassword123&*"
          ></FormField>
        </Form>
      </div>
    </Page>
  )
}

export default SignUp
