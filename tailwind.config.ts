import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#ffffff",
        "paper-2": "#f6f7f8",
        ink: "#14161a",
        "ink-soft": "#5b6470",
        line: "#e4e6e9",
        "line-strong": "#c9ced6",
        highlighter: "#ffd43b",
        "ink-blue": "#1d3fd1",
        "ink-blue-soft": "#eef1fe",
        success: "#0f7b4f",
        danger: "#c02626",
        warning: "#9a5b00",
      },
      fontFamily: {
        sans: ['"Instrument Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
      },
      boxShadow: {
        overlay: "0 1px 2px rgb(20 22 26 / 0.06), 0 12px 32px rgb(20 22 26 / 0.10)",
      },
    },
  },
  plugins: [],
} satisfies Config