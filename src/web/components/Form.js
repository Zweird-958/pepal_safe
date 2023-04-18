import Button from "@/web/components/Button"
import { Formik, Form as FormikForm } from "formik"

const Form = (props) => {
  const { signIn, children, ...otherProps } = props

  return (
    <div className="grid grid-cols-1 gap-6">
      {signIn ? (
        <div>
          <h3 className="font-medium">Sign-in</h3>
          <h4 className="text-sm">Saisissez vos identifiants.</h4>
        </div>
      ) : (
        <div>
          <h3 className="font-medium">Sign-up</h3>
          <h4 className="text-sm">Créeons votre compte.</h4>
        </div>
      )}

      <Formik {...otherProps}>
        <FormikForm className="grid grid-cols-1 gap-3">
          {children}
          <Button type="submit">
            {signIn ? "Créer un compte" : "Se connecter"}
          </Button>
        </FormikForm>
      </Formik>
    </div>
  )
}

export default Form
