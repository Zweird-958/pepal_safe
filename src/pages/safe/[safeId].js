import Page from "@/web/components/Page"
import api from "@/web/services/api"
import { useEffect, useState } from "react"
import formatDate from "@/web/utils/formatDate"
import ButtonIcon from "@/web/components/ButtonIcon"
import { PencilSquareIcon } from "@heroicons/react/24/solid"
import Form from "@/web/components/Form"
import Button from "@/web/components/Button"
import FormField from "@/web/components/FormField"
import * as yup from "yup"
import generatePassword from "@/web/utils/generatePassword"
import { useRouter } from "next/router"

export const getServerSideProps = async ({ params }) => {
  return {
    props: { params },
  }
}

const initialValues = {
  site: "",
  username: "",
  options: {
    upper: true,
    lower: true,
    number: true,
    symbol: false,
  },
  password: "",
}

const validationSchema = yup.object().shape({
  site: yup.string().url("URL invalide."),
  username: yup.string(),
  password: yup.string(),
})

const SafeId = (props) => {
  const {
    params: { safeId },
  } = props

  const router = useRouter()

  const [password, setPassword] = useState(null)
  const [passwordVisibility, setPasswordVisibility] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [passwordLength, setPasswordLength] = useState(20)

  const options = initialValues.options

  const newPassword = (setFieldValue) => {
    const length = document.querySelector("#length")
    const password = generatePassword({ ...options, length: length.value })
    setFieldValue("password", password)
  }

  const handleChange = (event) => {
    const { name, checked } = event.target
    const optionName = name.split(".")[1]

    if (optionName in initialValues.options) {
      options[optionName] = checked
    }
  }

  const handleClick = () => {
    setShowForm(!showForm)
  }

  const handleSubmit = async (values) => {
    await api.patch(`/password/${safeId}`, values)

    router.reload(window.location.pathname)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const {
          data: { result },
          status,
        } = await api.get(`/password/${safeId}`)

        if ([404, 403].includes(status)) {
          status === 404 && router.push("/404")

          return
        }

        setPassword(result)
        setPasswordVisibility("•".repeat(result.password.length))
      } catch (err) {
        return
      }
    })()
  }, [safeId, router])

  return (
    <Page variant={showForm ? "small" : "default"}>
      {showForm ? (
        <div className="grid grid-cols-1 gap-3 bg-neutral-100 p-4 rounded-lg shadow-lg shadow-indigo-500">
          <Form
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
            title="Édition"
            desc="Changer les champs qui vous intéresse."
            buttonSetField={password.password}
            setPassword={newPassword}
            onChange={handleChange}
            blackPlaceholder
            btnDesc="Modifier"
          >
            <FormField
              name="site"
              placeholder={password.site}
              blackPlaceholder
            />

            <FormField
              name="username"
              placeholder={password.username}
              blackPlaceholder
            />
            <div className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 p-0.5 rounded-lg">
              <div className="px-2 py-1 bg-neutral-100 rounded-md text-sm">
                <div className="flex">
                  <FormField name="options.upper" type="checkbox" label="ABC" />
                  <FormField name="options.lower" type="checkbox" label="abc" />
                  <FormField
                    name="options.number"
                    type="checkbox"
                    label="123"
                  />
                  <FormField
                    name="options.symbol"
                    type="checkbox"
                    label="#$&"
                  />
                </div>
                <div>
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
                  />
                </div>
              </div>
            </div>
          </Form>
          <Button type="button" onClick={handleClick}>
            Annuler
          </Button>
        </div>
      ) : (
        password && (
          <div className="grid grid-cols-1 gap-6 bg-neutral-100 p-4 rounded-lg shadow-lg shadow-indigo-500">
            <div className="flex gap-2 items-center">
              <ButtonIcon onClick={handleClick} className="hover:text-blue-500">
                <PencilSquareIcon className="w-8 p-2" />
              </ButtonIcon>
              <div className="grid grid-cols-1">
                <p className="font-medium">{password.site}</p>
                <p className="text-xs">
                  Dernière modification :{" "}
                  {formatDate(new Date(password.updatedAt))}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 p-0.5 rounded-lg">
                <div className="flex justify-between bg-neutral-100 rounded-md px-2 py-1">
                  <p>Nom d'utilisateur</p>
                  <p>{password.username}</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 p-0.5 rounded-lg">
                <div className="flex justify-between bg-neutral-100 rounded-md px-2 py-1 items-center">
                  <p>Mot de passe</p>
                  <p
                    onMouseOver={() => {
                      setPasswordVisibility(password.password)
                    }}
                    onMouseOut={() => {
                      setPasswordVisibility(
                        "•".repeat(password.password.length)
                      )
                    }}
                  >
                    {passwordVisibility}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </Page>
  )
}

export default SafeId
