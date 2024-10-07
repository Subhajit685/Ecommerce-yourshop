
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Set chunk size warning limit to 1000 kB (or any value you prefer)
    chunkSizeWarningLimit: 2000 // This will raise the limit to 1 MB for chunk size warnings
  }
})
