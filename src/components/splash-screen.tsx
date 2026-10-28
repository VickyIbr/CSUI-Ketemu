import { useEffect, useState } from "react"

const SESSION_KEY = "ketemu:splash:seen"

export function SplashScreen() {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  const dismiss = () => {
    setExiting(true)
    setTimeout(() => setVisible(false), 500)
  }

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return
    setVisible(true)
    sessionStorage.setItem(SESSION_KEY, "1")

    const timer = setTimeout(() => dismiss(), 1500)
    return () => clearTimeout(timer)
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
          to { opacity: 0; transform: translateY(-40px); }
        }
        @keyframes logoReveal {
          0% { opacity: 0; transform: scale(0.6) rotate(-8deg); }
          60% { opacity: 1; transform: scale(1.05) rotate(2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes letterIn {
          from { opacity: 0; transform: translateY(24px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes welcomeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes skipIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .splash-overlay {
          animation: ${exiting ? "splashExit 0.5s cubic-bezier(0.4, 0, 1, 1) forwards" : "splashEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1)"};
        }
        .splash-logo {
          animation: logoReveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both;
        }
        .splash-letter {
          display: inline-block;
          animation: letterIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .splash-welcome {
          animation: welcomeIn 0.5s ease-out 0.7s both;
        }
        .splash-skip {
          animation: skipIn 0.4s ease-out 0.9s both;
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
        className="splash-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ink-blue"
        role="dialog"
        aria-label="Splash screen"
      >
        <div className="flex flex-col items-center gap-5">
          {/* Logo */}
          <div className="splash-logo">
            <img
              src="/icon/favicon-48x48.png"
              alt="KeTemu"
              className="h-20 w-20 rounded-2xl shadow-2xl"
            />
          </div>

          {/* Brand name */}
          <h1 className="flex text-5xl font-bold tracking-tight text-white">
            {letters.map((letter, i) => (
              <span
                key={i}
                className="splash-letter"
                style={{ animationDelay: `${0.25 + i * 0.08}s` }}
              >
                {letter}
              </span>
            ))}
          </h1>

          {/* Welcome text */}
          <p className="splash-welcome text-base text-white/70 font-medium text-center max-w-xs">
            Temukan orang yang terverifikasi, dengan profil dan portfolio
          </p>

          {/* Skip button */}
          <button
            onClick={dismiss}
            className="splash-skip mt-4 text-sm text-white/50 hover:text-white transition-colors"
            aria-label="Lewati splash screen"
          >
            Lewati
          </button>
        </div>
      </div>
    </>
  )
}