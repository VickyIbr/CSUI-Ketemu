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

  // Letter entrance directions - each letter from a different side
  const letterConfigs = letters.map((letter, i) => {
    const directions = [
      { x: "-100%", y: "-50%", rotate: "-90deg" }, // K from left
      { x: "-50%", y: "-100%", rotate: "45deg" },  // e from top-left
      { x: "100%", y: "-50%", rotate: "90deg" },   // T from right
      { x: "50%", y: "-100%", rotate: "-45deg" },  // e from top-right
      { x: "-50%", y: "100%", rotate: "180deg" },  // m from bottom-left
      { x: "100%", y: "100%", rotate: "0deg" },    // u from bottom-right
    ]
    const dir = directions[i] || { x: "0", y: "0", rotate: "0deg" }
    return { letter, dir, delay: 0.2 + i * 0.08 }
  })

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
        @keyframes logoAppear {
          0% { opacity: 0; transform: scale(0.5) rotate(-6deg); }
          60% { opacity: 1; transform: scale(1.08) rotate(2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes logoPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.6); }
          50% { box-shadow: 0 0 0 12px rgba(99, 102, 241, 0); }
        }
        @keyframes letterSlide {
          0% {
            opacity: 0;
            transform: translate(var(--tx, 0), var(--ty, 0)) rotate(var(--tr, 0deg));
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg);
            filter: blur(0);
          }
        }
        @keyframes welcomeSlide {
          0% { opacity: 0; transform: translateY(16px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes skipIn {
          0% { opacity: 0; transform: translateX(-12px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .splash-overlay,
          .splash-logo,
          .splash-letter,
          .splash-welcome,
          .splash-skip {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>

      <div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ink-blue"
        style={{
          animation: exiting
            ? "splashExit 0.5s cubic-bezier(0.4, 0, 1, 1) forwards"
            : "splashEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        role="dialog"
        aria-label="Splash screen"
      >
        <div className="flex flex-col items-center gap-4">
          {/* Logo with float + pulse */}
          <div
            className="splash-logo relative"
            style={{
              animation: exiting
                ? `splashExit 0.5s cubic-bezier(0.4, 0, 1, 1) forwards`
                : `logoAppear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both, logoFloat 3s ease-in-out 0.7s infinite`,
            }}
          >
            <div className="relative h-20 w-20 rounded-2xl bg-white/10 p-1.5 shadow-2xl">
              <div className="h-full w-full rounded-xl bg-white/20 px-2.5 py-2 backdrop-blur-sm">
                <img
                  src="/icon/favicon-48x48.png"
                  alt="KeTemu"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Brand name with directional letter entrances */}
          <h1
            className="flex text-5xl font-bold tracking-tight text-white"
            style={{ animation: `splashEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) both` }}
          >
            {letterConfigs.map(({ letter, dir, delay }) => (
              <span
                key={letter}
                className="splash-letter inline-block"
                style={{
                  ["--tx" as any]: dir.x,
                  ["--ty" as any]: dir.y,
                  ["--tr" as any]: dir.rotate,
                  animation: `letterSlide 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both`,
                }}
              >
                {letter}
              </span>
            ))}
          </h1>

          {/* Welcome text */}
          <p
            className="splash-welcome text-base text-white/70 font-medium text-center max-w-xs"
            style={{ animation: `welcomeSlide 0.5s ease-out 0.7s both` }}
          >
            Temukan orang yang terverifikasi, dengan profil dan portfolio
          </p>

          {/* Skip button */}
          <button
            onClick={dismiss}
            className="splash-skip mt-3 text-sm text-white/50 transition-colors hover:text-white"
            style={{ animation: `skipIn 0.4s ease-out 0.9s both` }}
            aria-label="Lewati splash screen"
          >
            Lewati
          </button>
        </div>
      </div>
    </>
  )
}