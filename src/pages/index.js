import AppContext from "@/web/components/AppContext"
import Page from "@/web/components/Page"
import Safe from "@/web/components/Safe"
import { useContext } from "react"

const Index = () => {
  const {
    state: { session },
  } = useContext(AppContext)

  return (
    <Page title={session && "Coffre-fort"}>
      {session ? (
        <Safe session={session}></Safe>
      ) : (
        <div className="bg-neutral-100 p-4 rounded-lg shadow-lg shadow-indigo-500 ">
          <p>
            Pour accéder à votre coffre-fort, veuillez vous authentifier en
            cliquant sur le lien Sign-in.
            <br></br>
            Si vous n'avez pas encore de compte, vous pouvez en créer un en
            cliquant sur Sign-up.
          </p>
        </div>
      )}
    </Page>
  )
}

export default Index
