import clsx from "clsx"
import { Field, ErrorMessage } from "formik"

const FormField = (props) => {
  const { blackPlaceholder, name, label, children, ...otherProps } = props

  return (
    <div className="grid grid-cols-1 gap-1 w-full">
      {label ? (
        <div className="flex p-2 items-center gap-1">
          <Field name={name} className="" {...otherProps}></Field>
          <label>{label}</label>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 p-0.5 rounded-lg">
          <Field
            name={name}
            className={clsx(
              "w-full px-2 py-1 bg-neutral-100 rounded-md text-sm outline-none focus:ring-2 focus:ring-indigo-500",
              blackPlaceholder && "placeholder:text-black"
            )}
            {...otherProps}
          >
            {children}
          </Field>
        </div>
      )}
      <ErrorMessage
        component="p"
        name={name}
        className="text-xs ml-1 text-red-500 "
      />
    </div>
  )
}

export default FormField
