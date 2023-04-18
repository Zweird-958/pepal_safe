import config from "@/web/config"
import api from "@/web/services/api"
import { createContext, useEffect, useState } from "react"
import jsonwebtoken from "jsonwebtoken"
import { useRouter } from "next/router"

const AppContext = createContext()

export const AppContextProvider = (props) => {
  const [session, setSession] = useState(null)

  const router = useRouter()

  const signOut = () => {
    setSession(null)
    localStorage.removeItem(config.session.localStorageKey)
    router.push("/")
  }

  const signIn = async ({ email, password }) => {
    try {
      const {
        data: { result: jwt },
      } = await api.post("/sign-in", { email, password })

      localStorage.setItem(config.session.localStorageKey, jwt)
      setSession(jsonwebtoken.decode(jwt).payload)

      return [null, true]
    } catch (err) {
      return [err, false]
    }
  }

  useEffect(() => {
    ;(async () => {
      const jwt = localStorage.getItem(config.session.localStorageKey)

      const {
        data: { error },
      } = await api.get("/session")

      if (error) {
        return signOut()
      }

      if (jwt) {
        setSession(jsonwebtoken.decode(jwt).payload)

        return
      }
    })()
  }, [])

  return (
    <AppContext.Provider
      value={{
        state: {
          session,
        },
        actions: {
          signOut,
          signIn,
        },
      }}
      {...props}
    />
  )
}

export default AppContext
