import Button from "@/web/components/Button"
import ButtonIcon from "@/web/components/ButtonIcon"
import FormField from "@/web/components/FormField"
import { ArrowPathIcon } from "@heroicons/react/24/solid"
import { Formik, Form as FormikForm } from "formik"

const Form = (props) => {
  const {
    title,
    desc,
    btnDesc,
    children,
    buttonSetField,
    onChange,
    setPassword,
    blackPlaceholder,
    ...otherProps
  } = props

  return (
    <div className="grid grid-cols-1 gap-6">
      <div>
        <h3 className="font-medium">{title}</h3>
        <h4 className="text-sm">{desc}</h4>
      </div>

      <Formik {...otherProps}>
        {({ setFieldValue }) => (
          <FormikForm className="grid grid-cols-1 gap-3" onChange={onChange}>
            {children}
            {buttonSetField && (
              <div className="flex w-full gap-1">
                <FormField
                  name="password"
                  placeholder={
                    buttonSetField === true
                      ? "wOMmiU6NOIRXeWvKo35b"
                      : buttonSetField
                  }
                  blackPlaceholder={blackPlaceholder}
                />
                <ButtonIcon
                  type="button"
                  onClick={() => {
                    setPassword(setFieldValue)
                  }}
                >
                  <ArrowPathIcon className="w-6 h-4" />
                </ButtonIcon>
              </div>
            )}
            <Button type="submit">{btnDesc}</Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  )
}

export default Form
