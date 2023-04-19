import AppContext from "@/web/components/AppContext"
import Page from "@/web/components/Page"
import api from "@/web/services/api"
import { useRouter } from "next/router"
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
        console.log(err)

        return
      }
    })()
  }, [safeId])

  return <Page variant="small">{password && <div>{password.site}</div>}</Page>
}

export default SafeId
