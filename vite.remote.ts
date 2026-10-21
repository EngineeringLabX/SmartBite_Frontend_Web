import { federation } from '@module-federation/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { sharedDeps } from './shared-deps.ts'

type RemoteOptions = {
  /** Federation name — the shell imports pages as `<name>/<Page>` */
  name: string
  port: number
  /** Pages the shell can load, e.g. { './Dashboard': './src/pages/Dashboard/index.tsx' } */
  exposes: Record<string, string>
}

// Shared Vite config for every remote micro frontend
export const defineRemoteConfig = ({ name, port, exposes }: RemoteOptions) =>
  defineConfig({
    plugins: [
      react(),
      federation({ name, filename: 'remoteEntry.js', exposes, shared: sharedDeps, dts: false }),
    ],
    // Absolute origin so the shell loads this app's assets from the right server
    server: { port, strictPort: true, origin: `http://localhost:${port}` },
    preview: { port, strictPort: true },
    build: { target: 'es2023' },
  })
