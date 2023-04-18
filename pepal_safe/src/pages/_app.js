import { AppContextProvider } from "@/web/components/AppContext"
import "@/web/styles/globals.css"

const App = ({ Component, pageProps }) => {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}

export default App
