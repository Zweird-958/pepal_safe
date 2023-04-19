import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import Page from "@/web/components/Page"
import * as yup from "yup"

const initialValues = {
  site: "",
  username: "",
  password: "",
  options: {
    upper: true,
    lower: true,
    number: true,
    special: false,
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
  const handleSubmit = (values) => {
    console.log(values)
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
            <div className="flex px-2 py-1 bg-neutral-100 rounded-md text-sm outline-none focus:ring-2 focus:ring-indigo-500">
              <FormField
                name="options.upper"
                type="checkbox"
                checkbox="ABC"
              ></FormField>
              <FormField
                name="options.lower"
                type="checkbox"
                checkbox="abc"
              ></FormField>
              <FormField
                name="options.number"
                type="checkbox"
                checkbox="123"
              ></FormField>
              <FormField
                name="options.special"
                type="checkbox"
                checkbox="#$&"
              ></FormField>
            </div>
          </div>
        </Form>
      </div>
    </Page>
  )
}

export default AddPassword
