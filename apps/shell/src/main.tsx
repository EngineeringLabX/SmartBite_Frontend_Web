import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { auth } from '@smartbite/auth'
import { RouteError } from './components/RouteError'
import './index.css'
import { routeTree } from './routeTree.gen'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
})

const router = createRouter({
  routeTree,
  context: { queryClient, auth },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  // Also covers a micro frontend that fails to load
  defaultErrorComponent: RouteError,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Restore the signed-in user before the first route check runs
await auth.init()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
