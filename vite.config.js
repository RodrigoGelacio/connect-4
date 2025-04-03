import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/guide/build.html#multi-page-app
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // https://vite.dev/config/shared-options.html#resolve-alias
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    }
  }
})
