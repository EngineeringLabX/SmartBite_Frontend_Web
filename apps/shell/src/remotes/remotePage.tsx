import { lazy, Suspense, type ComponentType } from 'react'

/**
 * Turns a remote module import into a route component, e.g.
 *   component: remotePage(() => import('vendor/Dashboard'))
 * If the remote can't be loaded, the router's defaultErrorComponent shows instead.
 */
export function remotePage(load: () => Promise<{ default: ComponentType }>) {
  const Page = lazy(load)

  return function RemotePage() {
    return (
      <Suspense fallback={<p>Loading…</p>}>
        <Page />
      </Suspense>
    )
  }
}
