import { useEffect, useState } from "react"

const SESSION_KEY = "ketemu:splash:seen"

export function SplashScreen() {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  const dismiss = () => {
    setExiting(true)
    setTimeout(() => setVisible(false), 400)
  }

  useEffect(() => {
    // Per-session: only show once per tab session
    if (sessionStorage.getItem(SESSION_KEY)) return
    setVisible(true)
    sessionStorage.setItem(SESSION_KEY, "1")

    const timer = setTimeout(() => {
      dismiss()
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  const letters = "KeTemu".split("")

  return (
    <>
      <style>{`
        @keyframes splashFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes splashFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes letterLeft {
          from { opacity: 0; transform: translateX(-60px) rotate(-15deg); }
          to { opacity: 1; transform: translateX(0) rotate(0deg); }
        }
        @keyframes letterRight {
          from { opacity: 0; transform: translateX(60px) rotate(15deg); }
          to { opacity: 1; transform: translateX(0) rotate(0deg); }
        }
        @keyframes letterTop {
          from { opacity: 0; transform: translateY(-60px) scale(0.5); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes letterBottom {
          from { opacity: 0; transform: translateY(60px) scale(0.5); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes letterRotate {
          from { opacity: 0; transform: rotate(-180deg) scale(0); }
          to { opacity: 1; transform: rotate(0deg) scale(1); }
        }
        @keyframes letterScale {
          from { opacity: 0; transform: scale(0) rotate(90deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes logoPop {
          0% { opacity: 0; transform: scale(0.3) rotate(-20deg); }
          60% { opacity: 1; transform: scale(1.15) rotate(5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes welcomeFade {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotsPulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1.2); }
        }
        .splash-overlay {
          animation: ${exiting ? "splashFadeOut 0.4s ease-out forwards" : "splashFadeIn 0.3s ease-out"};
        }
        .splash-logo {
          animation: logoPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both;
        }
        .splash-letter-0 { animation: letterLeft 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both; }
        .splash-letter-1 { animation: letterRight 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.38s both; }
        .splash-letter-2 { animation: letterTop 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.46s both; }
        .splash-letter-3 { animation: letterBottom 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.54s both; }
        .splash-letter-4 { animation: letterRotate 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.62s both; }
        .splash-letter-5 { animation: letterScale 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.7s both; }
        .splash-welcome {
          animation: welcomeFade 0.5s ease-out 0.9s both;
        }
        .splash-dot-0 { animation: dotsPulse 1.2s ease-in-out 0.9s infinite; }
        .splash-dot-1 { animation: dotsPulse 1.2s ease-in-out 1.05s infinite; }
        .splash-dot-2 { animation: dotsPulse 1.2s ease-in-out 1.2s infinite; }
        @media (prefers-reduced-motion: reduce) {
          .splash-overlay, .splash-logo, .splash-letter-0, .splash-letter-1,
          .splash-letter-2, .splash-letter-3, .splash-letter-4, .splash-letter-5,
          .splash-welcome, .splash-dot-0, .splash-dot-1, .splash-dot-2 {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div
        className="splash-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-ink-blue via-ink-blue to-ink-blue/90"
        role="dialog"
        aria-label="Splash screen"
      >
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="splash-logo">
            <img
              src="/icon/favicon-48x48.png"
              alt="KeTemu"
              className="h-16 w-16 rounded-full shadow-lg"
            />
          </div>

          {/* Brand name with letter animation */}
          <h1 className="flex text-5xl font-bold tracking-tight text-white">
            {letters.map((letter, i) => (
              <span
                key={i}
                className={`splash-letter-${i} inline-block`}
                style={{ display: "inline-block" }}
              >
                {letter}
              </span>
            ))}
          </h1>

          {/* Welcome text */}
          <p className="splash-welcome text-lg text-white/80 font-medium">
            Temukan orang yang terverifikasi, dengan profil dan portfolio
          </p>

          {/* Loading dots */}
          <div className="flex gap-2 mt-2">
            <span className="splash-dot-0 h-2 w-2 rounded-full bg-white/60" />
            <span className="splash-dot-1 h-2 w-2 rounded-full bg-white/60" />
            <span className="splash-dot-2 h-2 w-2 rounded-full bg-white/60" />
          </div>

          {/* Skip button */}
          <button
            onClick={dismiss}
            className="mt-6 text-sm text-white/60 hover:text-white transition-colors underline underline-offset-4"
            aria-label="Lewati splash screen"
          >
            Lewati
          </button>
        </div>
      </div>
    </>
  )
}