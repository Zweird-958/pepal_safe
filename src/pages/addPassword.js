import ButtonIcon from "@/web/components/ButtonIcon"
import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import Page from "@/web/components/Page"
import { ArrowPathIcon } from "@heroicons/react/24/solid"
import * as yup from "yup"

const initialValues = {
  site: "",
  username: "",
  password: "",
}
const validationSchema = yup.object().shape({
  site: yup.string().url().required(),
  username: yup.string().required(),
  password: yup.string().required(),
})

const AddPassword = (props) => {
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
          <div className="flex w-full gap-1">
            <FormField
              id="password"
              name="password"
              placeholder="wOMmiU6NOIRXeWvKo35b"
            ></FormField>
            {/* <ButtonIcon
              type="button"
              onClick={() => {
                setFieldValue("password", "caca")
              }}
            >
              <ArrowPathIcon className="w-6 h-4" />
            </ButtonIcon> */}
          </div>
        </Form>
      </div>
    </Page>
  )
}

export default AddPassword
