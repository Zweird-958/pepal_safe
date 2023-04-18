import Button from "@/web/components/Button"
import { Formik, Form as FormikForm } from "formik"
import { ArrowPathIcon } from "@heroicons/react/24/solid"
import ButtonIcon from "@/web/components/ButtonIcon"

const Form = (props) => {
  const { title, desc, btnDesc, children, buttonSetField, ...otherProps } =
    props

  return (
    <div className="grid grid-cols-1 gap-6">
      <div>
        <h3 className="font-medium">{title}</h3>
        <h4 className="text-sm">{desc}</h4>
      </div>

      <Formik {...otherProps}>
        {({ setFieldValue }) => (
          <FormikForm className="grid grid-cols-1 gap-3">
            {children}
            {buttonSetField && (
              <ButtonIcon
                type="button"
                onClick={() => {
                  setFieldValue("password", "bruno")
                }}
              >
                <ArrowPathIcon className="w-4" />
              </ButtonIcon>
            )}
            <Button type="submit">{btnDesc}</Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  )
}

export default Form
