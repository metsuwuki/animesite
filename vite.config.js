// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/animesite/', // обязательно для https://metsuwuki.github.io/animesite/
  plugins: [react()]
})