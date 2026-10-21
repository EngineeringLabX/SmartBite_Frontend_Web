import { useAuth } from '@smartbite/auth'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { AccountMenu } from '../../components/AccountMenu'
import { APP_NAME } from '../../constants'

// Layout with the header for every page inside _app/ (adds nothing to the URL)
export const Route = createFileRoute('/_app')({
  component: AppLayout,
})

function AppLayout() {
  const { user, hasRole } = useAuth()

  return (
    <>
      <header className="header">
        <Link to="/" className="brand">
          {APP_NAME}
        </Link>
        <nav>
          <Link to="/menu">Menu</Link>
          <Link to="/profile">Wellness Profile</Link>
          {/* Each kind of user gets a link to their own micro frontend */}
          {hasRole('Restaurant', 'Home-Chef') && <Link to="/vendor">Vendor portal</Link>}
          {hasRole('Delivery Partner') && <Link to="/delivery">Deliveries</Link>}
          {hasRole('Platform Admin') && <Link to="/admin">Admin</Link>}
          {user ? (
            <AccountMenu />
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/register" className="button">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  )
}
