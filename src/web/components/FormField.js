import { Field, ErrorMessage } from "formik"

const FormField = (props) => {
  const { name, children, ...otherProps } = props

  return (
    <div className="grid grid-cols-1 gap-1 w-full">
      <div className="bg-gradient-to-r font from-violet-400 via-indigo-400 to-blue-400 p-0.5 rounded-lg">
        <Field
          name={name}
          className="w-full px-2 py-1 bg-neutral-100 rounded-md text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          {...otherProps}
        >
          {children}
        </Field>
      </div>
      <ErrorMessage
        component="p"
        name={name}
        className="text-xs ml-1 text-red-500 "
      />
    </div>
  )
}

export default FormField
