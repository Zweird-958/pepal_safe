import AppContext from "@/web/components/AppContext"
import Page from "@/web/components/Page"
import api from "@/web/services/api"
import decryption from "@/api/utils/decryption"
import { useContext, useEffect, useState } from "react"

export const getServerSideProps = async ({ params }) => {
  return {
    props: { params },
  }
}

const SafeId = (props) => {
  const {
    state: { session },
  } = useContext(AppContext)

  const {
    params: { safeId },
  } = props

  const [password, setPassword] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const {
          data: { result },
        } = await api.get(`/password/${safeId}`)

        setPassword(result)
      } catch (err) {
        return
      }
    })()
  }, [safeId])

  return (
    <Page variant="small">
      {password && (
        <div className="bg-neutral-100 p-4 rounded-lg shadow-lg shadow-indigo-500">
          {password.site}
          {password.updatedAt}
          {password.username}
          {password.password}
        </div>
      )}
    </Page>
  )
}

export default SafeId
