import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.X_API_KEY': JSON.stringify("PNKBT1R-YZV4K54-MMX4VAK-7QJKH3X"),
  },
  plugins: [react()],
})
