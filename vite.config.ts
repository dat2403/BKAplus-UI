import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/BKAplus-UI/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000, // Adjust the limit to a value suitable for your project
  },
})
