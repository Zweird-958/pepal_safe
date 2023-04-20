import AppContext from "@/web/components/AppContext"
import Button from "@/web/components/Button"
import api from "@/web/services/api"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"

const Safe = () => {
  const {
    state: { session },
  } = useContext(AppContext)

  const [passwords, setPasswords] = useState([])
  const [passwordIsChanged, setPasswordIsChanged] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (session) {
        try {
          const {
            data: { result },
          } = await api.get("/password")

          setPasswordIsChanged(result.passwordChanged)
          setPasswords(result.getPasswords)
        } catch (err) {
          return
        }
      }
    })()
  }, [session])

  return (
    <div className="grid grid-cols-1 gap-4">
      {!passwordIsChanged && (
        <div className="grid grid-cols-1 gap-4 bg-neutral-100 p-4 rounded-lg shadow-lg shadow-indigo-500">
          <div className="grid grid-cols-1 gap-4 text-red-500 ">
            <div className="flex gap-1 justify-center">
              <ExclamationTriangleIcon className="w-5"></ExclamationTriangleIcon>
              <p className="font-medium">ATTENTION</p>
              <ExclamationTriangleIcon className="w-5"></ExclamationTriangleIcon>
            </div>
            <p className="break-words">
              Tu possèdes toujours ton mot de passe par défaut. Il est fortement
              recommandé de le modifier afin d'accroître la sécurité de ton
              compte.
            </p>
          </div>
          <Link href="/profile">
            <Button>Changer mon mot de passe</Button>
          </Link>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 bg-neutral-100 p-4 rounded-lg shadow-lg shadow-indigo-500">
        <p>Salut {session.userUsername}, nous sommes content de te revoir.</p>

        <div className="flex w-full gap-2">
          <Link href="/genPassword">
            <Button>Générer un mot de passe</Button>
          </Link>
          <Link href="/addPassword">
            <Button>Ajouter un mot de passe</Button>
          </Link>
        </div>
      </div>
      {passwords.length > 0 && (
        <div className="grid grid-cols-1 gap-2 bg-neutral-100 p-4 rounded-lg shadow-lg shadow-indigo-500">
          {passwords.map((password) => {
            return (
              <div
                key={password._id}
                className="bg-gradient-to-r font from-violet-400 via-indigo-400 to-blue-400 p-0.5 rounded-lg"
              >
                <div className="flex justify-between bg-neutral-100 rounded-md px-2 py-1 items-center">
                  <div>
                    <p className="text-sm font-medium">{password.site}</p>
                    <p className="text-xs">{password.username}</p>
                  </div>
                  <Link href={`/safe/${password._id}`}>
                    <InformationCircleIcon className="w-5 hover:text-blue-500"></InformationCircleIcon>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Safe
