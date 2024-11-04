import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // The hostname to bind to
    port: 5173,        // Change the port if needed
    open: true         // Automatically open the browser
  }
})
