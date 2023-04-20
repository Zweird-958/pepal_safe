import AppContext from "@/web/components/AppContext"
import Button from "@/web/components/Button"
import ButtonIcon from "@/web/components/ButtonIcon"
import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import MainDiv from "@/web/components/MainDiv"
import Page from "@/web/components/Page"
import api from "@/web/services/api"
import formatDate from "@/web/utils/formatDate"
import { PencilSquareIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import * as yup from "yup"

const roles = {
  student: "Étudiant(e)",
  teacher: "Intervenant(e)",
  admin: "Administrateur",
}

const passwordInitialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
}

const passwordValidationSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Ancien mot de passe est un champ requis."),
  newPassword: yup
    .string()
    .min(8, "Minimum 8 caractères.")
    .required("Nouveau mot de passe est un champ requis."),
  confirmPassword: yup
    .string()
    .test(
      "match",
      "Vous devez mettre les mêmes mot de passe",
      function (value) {
        return value === this.parent.newPassword
      }
    )
    .required("Nouveau mot de passe est un champ requis."),
})

const emailInitialValues = {
  email: "",
}

const emailValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Saisissez un e-mail valide.")
    .required("E-mail est un champ requis."),
})

const Profile = () => {
  const {
    state: { session },
  } = useContext(AppContext)

  const [user, setUser] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const router = useRouter()

  const handleClick = () => {
    setShowForm(!showForm)
  }

  const handlePasswordSubmit = async ({ oldPassword, newPassword }) => {
    const {
      data: { error },
    } = await api.patch("/users", { oldPassword, password: newPassword })

    if (error == "Wrong password.") {
      setPasswordError(true)
    } else if (!error) {
      setShowForm(false)
      setPasswordError(false)
    }
  }

  const handleEmailSubmit = async (values) => {
    await api.patch("/users", values)

    router.reload(window.location.pathname)
  }

  useEffect(() => {
    ;(async () => {
      if (session) {
        try {
          const {
            data: { result },
          } = await api.get(`/user/${session.userId}`)

          setUser(result)
        } catch (err) {
          return
        }
      }
    })()
  }, [session])

  return (
    <Page variant={showForm ? "small" : "default"}>
      {showForm ? (
        <MainDiv className="grid grid-cols-1 gap-10">
          <Form
            onSubmit={handleEmailSubmit}
            initialValues={emailInitialValues}
            validationSchema={emailValidationSchema}
            btnDesc="Modifier"
            title="E-mail"
            desc="Modifier votre e-mail."
          >
            <FormField name="email" placeholder={user.email} />
          </Form>
          <Form
            onSubmit={handlePasswordSubmit}
            initialValues={passwordInitialValues}
            validationSchema={passwordValidationSchema}
            btnDesc="Modifier"
            title="Mot de passe"
            desc="Modifier votre mot de passe."
          >
            <FormField
              name="oldPassword"
              type="password"
              placeholder="Ancien mot de passe"
            />
            <FormField
              name="newPassword"
              type="password"
              placeholder="Nouveau mot de passe"
            />
            <FormField
              name="confirmPassword"
              type="password"
              placeholder="Nouveau mot de passe"
            />
            {passwordError && (
              <p className="text-red-500 font-medium">
                Ancien mot de passe incorrect.
              </p>
            )}
          </Form>
          <Button type="button" onClick={handleClick}>
            Annuler
          </Button>
        </MainDiv>
      ) : (
        <>
          {user && (
            <div className="grid grid-cols-1 gap-6 bg-neutral-100 p-4 rounded-lg shadow-lg shadow-indigo-500">
              <div className="flex gap-2 items-center">
                <ButtonIcon
                  onClick={handleClick}
                  className="hover:text-blue-500"
                >
                  <PencilSquareIcon className="w-8 p-2" />
                </ButtonIcon>
                <div className="grid grid-cols-1">
                  <p className="font-medium">{user.username}</p>
                  <p className="text-xs">
                    Dernière modification :{" "}
                    {formatDate(new Date(user.updatedAt))}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 p-0.5 rounded-lg">
                  <div className="flex justify-between bg-neutral-100 rounded-md px-2 py-1">
                    <p>E-mail</p>
                    <p>{user.email}</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 p-0.5 rounded-lg">
                  <div className="flex justify-between bg-neutral-100 rounded-md px-2 py-1 items-center">
                    <p>Rôle</p>
                    <p>{roles[user.role]}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Page>
  )
}

export default Profile
