import { AppRouter } from "@/app/router"
import { Providers } from "@/app/providers"
import { SplashScreen } from "@/components/splash-screen"
import { SEO } from "@/components/seo"

function App() {
  return (
    <Providers>
      <SEO />
      <SplashScreen />
      <AppRouter />
    </Providers>
  )
}

export default App