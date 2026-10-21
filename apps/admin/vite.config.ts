import { defineRemoteConfig } from '../../vite.remote.ts'

// Admin Dashboard — loaded by the shell as admin/<Page>
export default defineRemoteConfig({
  name: 'admin',
  port: 5185,
  exposes: {
    './Overview': './src/pages/Overview/index.tsx',
    './VendorApprovals': './src/pages/VendorApprovals/index.tsx',
  },
})
