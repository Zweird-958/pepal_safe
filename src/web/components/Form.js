import Button from "@/web/components/Button"
import { Formik, Form as FormikForm } from "formik"
import { ArrowPathIcon } from "@heroicons/react/24/solid"
import ButtonIcon from "@/web/components/ButtonIcon"
import FormField from "@/web/components/FormField"
import generatePassword from "@/web/utils/generatePassword"

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
              <div className="flex w-full gap-1">
                <FormField
                  name="password"
                  placeholder="wOMmiU6NOIRXeWvKo35b"
                ></FormField>
                <ButtonIcon
                  type="button"
                  onClick={() => {
                    const length = document.getElementById("length")
                    const upper = document.getElementById("upper")
                    const lower = document.getElementById("lower")
                    const number = document.getElementById("number")
                    const symbol = document.getElementById("symbol")

                    const values = {
                      length: length.value,
                      upper: upper.checked,
                      lower: lower.checked,
                      number: number.checked,
                      symbol: symbol.checked,
                    }

                    setFieldValue("password", generatePassword(values))
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
