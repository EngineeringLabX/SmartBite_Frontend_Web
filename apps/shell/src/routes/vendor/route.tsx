import { PortalLayout } from '@smartbite/ui'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { AccountMenu } from '../../components/AccountMenu'
import { requireRole } from '../../utils/guards'

// Vendor Web Portal (vendor micro frontend) — restaurants and home-chefs
export const Route = createFileRoute('/vendor')({
  beforeLoad: ({ context, location }) => requireRole(context.auth, location, 'Restaurant', 'Home-Chef'),
  component: VendorLayout,
})

function VendorLayout() {
  return (
    <PortalLayout
      title="Vendor Portal"
      subtitle="Restaurants & Home-Chefs"
      nav={
        <>
          <Link to="/vendor" activeOptions={{ exact: true }}>
            Dashboard
          </Link>
          <Link to="/vendor/menu">Menu</Link>
          <Link to="/kitchen">Kitchen display ↗</Link>
        </>
      }
      account={<AccountMenu />}
    >
      <Outlet />
    </PortalLayout>
  )
}
