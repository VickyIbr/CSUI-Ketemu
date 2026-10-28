import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    {
      name: 'robots-txt-swap',
      closeBundle() {
        const outDir = path.resolve(__dirname, 'dist')
        const robotsPath = path.join(outDir, 'robots.txt')
        if (mode !== 'production') {
          // Dev mode: use noindex robots
          const devRobots = path.join(__dirname, 'public', 'robots.dev.txt')
          if (fs.existsSync(devRobots)) {
            fs.copyFileSync(devRobots, robotsPath)
          }
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}))