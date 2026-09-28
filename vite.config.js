import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  base: '/gaming/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
})