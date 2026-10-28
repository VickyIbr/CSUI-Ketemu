import { AppRouter } from "@/app/router"
import { Providers } from "@/app/providers"
import { SplashScreen } from "@/components/splash-screen"

function App() {
  return (
    <Providers>
      <SplashScreen />
      <AppRouter />
    </Providers>
  )
}

export default App