import { AppRouter } from "@/app/router"
import { Providers } from "@/app/providers"
import { SEO } from "@/components/seo"

function App() {
  return (
    <Providers>
      <SEO />
      <AppRouter />
    </Providers>
  )
}

export default App