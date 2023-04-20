import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import MainDiv from "@/web/components/MainDiv"
import Page from "@/web/components/Page"
import api from "@/web/services/api"
import { useState } from "react"
import * as yup from "yup"

const passwordInitialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
}

const passwordValidationSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Ancien mot de passe est un champ requis."),
  newPassword: yup
    .string()
    .min(8, "Minimum 8 caractères.")
    .required("Nouveau mot de passe est un champ requis."),
  confirmPassword: yup
    .string()
    .test(
      "match",
      "Vous devez mettre les mêmes mot de passe",
      function (value) {
        return value === this.parent.newPassword
      }
    )
    .required(),
})

const emailInitialValues = {
  email: "",
}

const emailValidationSchema = yup.object().shape({
  email: yup.string().required("Entrez la nouvelle email."),
})

const Profile = () => {
  const [passwordError, setPasswordError] = useState(false)

  const handlePasswordSubmit = async ({ oldPassword, newPassword }) => {
    const {
      data: { error },
    } = await api.patch("/users", { oldPassword, password: newPassword })

    if (error == "Wrong password.") {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }
  }

  const handleEmailSubmit = async (values) => {
    await api.patch("/users", values)
  }

  return (
    <Page>
      <MainDiv>
        <h3 className="font-medium text-lg">Profile</h3>

        <Form
          onSubmit={handleEmailSubmit}
          initialValues={emailInitialValues}
          validationSchema={emailValidationSchema}
          btnDesc="Modifier"
          title="Modifier email"
        >
          <FormField name="email" />
        </Form>
        <Form
          onSubmit={handlePasswordSubmit}
          initialValues={passwordInitialValues}
          validationSchema={passwordValidationSchema}
          btnDesc="Modifier"
          title="Modifier mot de passe"
        >
          <FormField
            name="oldPassword"
            type="password"
            placeholder="Ancien mot de passe"
          />
          <FormField
            name="newPassword"
            type="password"
            placeholder="Nouveau mot de passe"
          />
          <FormField
            name="confirmPassword"
            type="password"
            placeholder="Confirmer nouveau mot de passe"
          />
        </Form>
        {passwordError && (
          <p className="text-red-500 font-medium">
            Ancien mot de passe incorrect.
          </p>
        )}
      </MainDiv>
    </Page>
  )
}

export default Profile
