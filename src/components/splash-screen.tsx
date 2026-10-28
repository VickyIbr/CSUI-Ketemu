import { useEffect, useState } from "react"

const SESSION_KEY = "ketemu:splash:seen"

// Debug mode: show splash on every reload via ?splash=1 or in dev mode
const isDev = import.meta.env.DEV

export function SplashScreen() {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [phase, setPhase] = useState(0) // 0=logo, 1=letters, 2=welcome, 3=skip

  const dismiss = () => {
    setExiting(true)
    setTimeout(() => setVisible(false), 500)
  }

  useEffect(() => {
    // Debug: allow forcing splash via URL param
    const params = new URLSearchParams(window.location.search)
    const forceSplash = params.get("splash") === "1"

    if (!forceSplash && !isDev && sessionStorage.getItem(SESSION_KEY)) return

    setVisible(true)
    sessionStorage.setItem(SESSION_KEY, "1")

    // Sequential phase timeline
    const t1 = setTimeout(() => setPhase(1), 400)   // logo appears at 0.4s
    const t2 = setTimeout(() => setPhase(2), 1200)  // welcome at 1.2s
    const t3 = setTimeout(() => setPhase(3), 1600)  // skip at 1.6s
    const t4 = setTimeout(() => dismiss(), 2200)     // auto-dismiss at 2.2s

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [])

  if (!visible) return null

  const letters = "KeTemu".split("")

  return (
    <>
      <style>{`
        @keyframes splashEnter {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes splashExit {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-60px); }
        }
        @keyframes logoBounceIn {
          0% { opacity: 0; transform: scale(0) rotate(-180deg); }
          50% { opacity: 1; transform: scale(1.15) rotate(10deg); }
          70% { transform: scale(0.95) rotate(-5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes letterPop {
          0% { opacity: 0; transform: scale(0.3) translateY(40px); filter: blur(8px); }
          60% { opacity: 1; transform: scale(1.15) translateY(-4px); filter: blur(0); }
          80% { transform: scale(0.95) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes welcomeFade {
          0% { opacity: 0; transform: translateY(20px); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes skipFade {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes bgPulse {
          0%, 100% { background-color: #1e3a8a; }
          50% { background-color: #1e40af; }
        }
        @media (prefers-reduced-motion: reduce) {
          .splash-overlay, .splash-logo, .splash-letter, .splash-welcome, .splash-skip {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>

      <div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{
          animation: exiting
            ? "splashExit 0.5s cubic-bezier(0.4, 0, 1, 1) forwards"
            : "splashEnter 0.3s ease-out, bgPulse 2s ease-in-out infinite",
        }}
        role="dialog"
        aria-label="Splash screen"
      >
        <div className="flex flex-col items-center gap-6">
          {/* Phase 0: Logo */}
          <div
            className="relative"
            style={{
              animation: phase >= 0
                ? "logoBounceIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both, logoFloat 2.5s ease-in-out 0.8s infinite"
                : "none",
            }}
          >
            <div className="h-20 w-20 rounded-2xl bg-white/10 p-1.5 shadow-2xl backdrop-blur-sm">
              <div className="h-full w-full rounded-xl bg-white/20 px-2.5 py-2">
                <img
                  src="/icon/favicon-48x48.png"
                  alt="KeTemu"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Phase 1: Letters one by one */}
          <h1 className="flex text-5xl font-bold tracking-tight text-white">
            {letters.map((letter, i) => (
              <span
                key={i}
                className="inline-block"
                style={{
                  animation:
                    phase >= 1
                      ? `letterPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.15}s both`
                      : "none",
                  opacity: phase >= 1 ? undefined : 0,
                }}
              >
                {letter}
              </span>
            ))}
          </h1>

          {/* Phase 2: Welcome text */}
          <p
            className="text-base text-white/70 font-medium text-center max-w-xs"
            style={{
              animation: phase >= 2 ? "welcomeFade 0.5s ease-out both" : "none",
              opacity: phase >= 2 ? undefined : 0,
            }}
          >
            Temukan orang yang terverifikasi, dengan profil dan portfolio
          </p>

          {/* Phase 3: Skip button */}
          <button
            onClick={dismiss}
            className="mt-2 text-sm text-white/50 transition-colors hover:text-white"
            style={{
              animation: phase >= 3 ? "skipFade 0.4s ease-out both" : "none",
              opacity: phase >= 3 ? undefined : 0,
            }}
            aria-label="Lewati splash screen"
          >
            Lewati
          </button>
        </div>
      </div>
    </>
  )
}