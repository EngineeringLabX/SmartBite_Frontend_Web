import { PortalLayout } from '@smartbite/ui'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { AccountMenu } from '../../components/AccountMenu'
import { requireRole } from '../../utils/guards'

// Admin Dashboard (admin micro frontend) — platform admins only
export const Route = createFileRoute('/admin')({
  beforeLoad: ({ context, location }) => requireRole(context.auth, location, 'Platform Admin'),
  component: AdminLayout,
})

function AdminLayout() {
  return (
    <PortalLayout
      title="Admin Dashboard"
      subtitle="SmartBite platform"
      nav={
        <>
          <Link to="/admin" activeOptions={{ exact: true }}>
            Overview
          </Link>
          <Link to="/admin/vendors">Vendor approvals</Link>
        </>
      }
      account={<AccountMenu />}
    >
      <Outlet />
    </PortalLayout>
  )
}
