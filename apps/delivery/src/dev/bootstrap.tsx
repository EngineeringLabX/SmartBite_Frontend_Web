// Standalone dev app: lets this team run its pages without the shell.
// Not used when the shell loads this app through Module Federation.
import '@smartbite/ui/tokens.css'
import { StandalonePreview } from '@smartbite/ui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Deliveries from '../pages/Deliveries'
import Earnings from '../pages/Earnings'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <StandalonePreview title="Delivery Partner App" pages={{ Deliveries, Earnings }} />
    </QueryClientProvider>
  </StrictMode>,
)
