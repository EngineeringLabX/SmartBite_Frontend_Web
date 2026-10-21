import { FullscreenLayout } from '@smartbite/ui'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { AccountMenu } from '../../components/AccountMenu'
import { requireRole } from '../../utils/guards'

// Kitchen Display System (kitchen micro frontend) — full-screen for a kitchen wall or tablet
export const Route = createFileRoute('/kitchen')({
  beforeLoad: ({ context, location }) => requireRole(context.auth, location, 'Restaurant', 'Home-Chef'),
  component: KitchenLayout,
})

function KitchenLayout() {
  return (
    <FullscreenLayout
      title="Kitchen Display"
      actions={
        <>
          <Link to="/vendor" className="backdrop-link">
            ← Vendor portal
          </Link>
          <AccountMenu />
        </>
      }
    >
      <Outlet />
    </FullscreenLayout>
  )
}
