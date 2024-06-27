import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.X_API_KEY': JSON.stringify("QXJX2VG-SK1MWXX-KZ1C8YC-Q6KW1Q7"),
  },
  plugins: [react()],
})
