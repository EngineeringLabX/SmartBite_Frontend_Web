import type { AuthStore } from '@smartbite/auth'
import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { DevUserSwitcher } from '../components/DevUserSwitcher'

type RouterContext = {
  queryClient: QueryClient
  auth: AuthStore
}

// Dev tools (never in production builds). Hidden on phone widths, where their buttons
// would cover the delivery app's bottom tab bar.
const showDevtools = window.matchMedia('(min-width: 768px)').matches

// Bare root: page chrome lives in _app/route.tsx, so full-screen pages like /login can skip it
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      {/* Vite replaces import.meta.env.DEV with false in production, so this is stripped from builds */}
      {import.meta.env.DEV && <DevUserSwitcher />}
      {showDevtools && (
        <>
          <ReactQueryDevtools buttonPosition="bottom-left" />
          <TanStackRouterDevtools position="bottom-right" />
        </>
      )}
    </>
  ),
  notFoundComponent: () => <p className="container">Page not found.</p>,
})
