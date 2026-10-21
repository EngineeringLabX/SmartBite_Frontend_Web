import { federation } from '@module-federation/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { sharedDeps } from '../../shared-deps.ts'

const remote = (name: string, url: string) => ({ type: 'module' as const, name, entry: `${url}/remoteEntry.js` })

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname)

  return {
    plugins: [
      // Must come before the React plugin
      tanstackRouter({ target: 'react', autoCodeSplitting: true }),
      react(),
      federation({
        name: 'shell',
        // Micro frontends loaded at runtime; URLs come from .env so each can deploy on its own
        remotes: {
          vendor: remote('vendor', env.VITE_VENDOR_URL),
          kitchen: remote('kitchen', env.VITE_KITCHEN_URL),
          delivery: remote('delivery', env.VITE_DELIVERY_URL),
          admin: remote('admin', env.VITE_ADMIN_URL),
        },
        shared: sharedDeps,
        dts: false,
      }),
    ],
    server: { port: 5180, strictPort: true, origin: 'http://localhost:5180' },
    preview: { port: 5180, strictPort: true },
    build: { target: 'es2023' },
  }
})
