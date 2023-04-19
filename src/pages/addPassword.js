import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import Page from "@/web/components/Page"
import api from "@/web/services/api"
import { useState } from "react"
import * as yup from "yup"

const initialValues = {
  site: "",
  username: "",
  password: "",
  options: {
    upper: true,
    lower: true,
    number: true,
    symbol: false,
  },
}

const validationSchema = yup.object().shape({
  site: yup
    .string()
    .url("URL invalide.")
    .required("URL est un champ obligatoire."),
  username: yup.string().required("Username est un champ obligatoire."),
  password: yup.string().required("Mot de passe est un champ obligatoire."),
})

const AddPassword = () => {
  const [passwordLength, setPasswordLength] = useState(20)

  const handleSubmit = async (values) => {
    await api.post("/password", values)
  }

  return (
    <Page variant="small">
      <div className="p-4 bg-neutral-100 rounded-lg mt-4 shadow-lg shadow-indigo-500">
        <Form
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
          title="Nouveau mot de passe"
          desc="Saisissez tous les champs."
          btnDesc="Ajouter"
          buttonSetField
        >
          <FormField
            name="site"
            placeholder="https://www.pepal.eu/"
          ></FormField>
          <FormField name="username" placeholder="etu.bgomes"></FormField>
          <div className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 p-0.5 rounded-lg">
            <div className="px-2 py-1 bg-neutral-100 rounded-md text-sm">
              <div className="flex">
                <FormField
                  id="upper"
                  name="options.upper"
                  type="checkbox"
                  label="ABC"
                ></FormField>
                <FormField
                  id="lower"
                  name="options.lower"
                  type="checkbox"
                  label="abc"
                ></FormField>
                <FormField
                  id="number"
                  name="options.number"
                  type="checkbox"
                  label="123"
                ></FormField>
                <FormField
                  id="symbol"
                  name="options.symbol"
                  type="checkbox"
                  label="#$&"
                ></FormField>
              </div>
              <div className="">
                <FormField
                  id="length"
                  name="length"
                  type="range"
                  min="10"
                  max="30"
                  step="1"
                  className="w-full"
                  onChange={() => {
                    setPasswordLength(document.getElementById("length").value)
                  }}
                  label={passwordLength}
                ></FormField>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </Page>
  )
}

export default AddPassword
