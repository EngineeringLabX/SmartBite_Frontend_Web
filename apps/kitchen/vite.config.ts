import { defineRemoteConfig } from '../../vite.remote.ts'

// Kitchen Display System — loaded by the shell as kitchen/<Page>
export default defineRemoteConfig({
  name: 'kitchen',
  port: 5183,
  exposes: {
    './KitchenDisplay': './src/pages/KitchenDisplay/index.tsx',
  },
})
