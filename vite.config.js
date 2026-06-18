import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path so the build works from https://jawadrizvi.com/v2/
export default defineConfig({
  base: '/v2/',
  plugins: [react()],
})
