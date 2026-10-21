import { defineRemoteConfig } from '../../vite.remote.ts'

// Vendor Web Portal — loaded by the shell as vendor/<Page>
export default defineRemoteConfig({
  name: 'vendor',
  port: 5182,
  exposes: {
    './Dashboard': './src/pages/Dashboard/index.tsx',
    './MenuManager': './src/pages/MenuManager/index.tsx',
  },
})
