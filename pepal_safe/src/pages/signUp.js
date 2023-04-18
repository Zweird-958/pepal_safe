import AppContext from "@/web/components/AppContext"
import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import Page from "@/web/components/Page"
import api from "@/web/services/api"
import { useRouter } from "next/router"
import { useContext } from "react"
import * as yup from "yup"

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
        >
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
