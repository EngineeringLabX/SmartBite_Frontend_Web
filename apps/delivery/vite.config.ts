import { defineRemoteConfig } from '../../vite.remote.ts'

// Delivery Partner App — loaded by the shell as delivery/<Page>
export default defineRemoteConfig({
  name: 'delivery',
  port: 5184,
  exposes: {
    './Deliveries': './src/pages/Deliveries/index.tsx',
    './Earnings': './src/pages/Earnings/index.tsx',
  },
})
