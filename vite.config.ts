import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  server: {
    port: 3333
  },
  resolve: {
    alias: [{ find: '~', replacement: '/src' }]
  },
  plugins: [react()]
})
