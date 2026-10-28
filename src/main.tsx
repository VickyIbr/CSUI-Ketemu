import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import { useEventsStore } from "./store/events-store"

async function init() {
  const store = useEventsStore.getState()
  await store.loadData()
}

init().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
})
