import { MobileLayout } from '@smartbite/ui'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { AccountMenu } from '../../components/AccountMenu'
import { requireRole } from '../../utils/guards'

// Delivery Partner app (delivery micro frontend) — mobile-first web app
export const Route = createFileRoute('/delivery')({
  beforeLoad: ({ context, location }) => requireRole(context.auth, location, 'Delivery Partner'),
  component: DeliveryLayout,
})

function DeliveryLayout() {
  return (
    <MobileLayout
      title="SmartBite Rider"
      actions={<AccountMenu />}
      tabs={
        <>
          <Link to="/delivery" activeOptions={{ exact: true }}>
            Deliveries
          </Link>
          <Link to="/delivery/earnings">Earnings</Link>
        </>
      }
    >
      <Outlet />
    </MobileLayout>
  )
}
