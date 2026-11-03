import { useAuth } from '@smartbite/auth'
import { Link, useRouter } from '@tanstack/react-router'
import { useState, type ReactNode } from 'react'
import { Icon } from './Icon'
import styles from './WellnessShell.module.css'

const navLink = {
  className: styles.navLink,
  activeProps: { className: styles.navActive },
}

/** Light page chrome for the wellness profile: header, content area and footer */
export function WellnessShell({ children }: { children: ReactNode }) {
  const { user, hasRole, logout } = useAuth()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const signOut = async () => {
    await logout()
    // Re-run route guards so this protected page redirects away
    await router.invalidate()
  }

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.brand}>
            <span className={styles.logo}>
              <Icon name="psychology_alt" size={22} />
            </span>
            <span>
              <span className={styles.brandName}>
                SmartBite <em>AI</em>
              </span>
              <span className={styles.brandTag}>Culinary Intelligence</span>
            </span>
          </Link>

          <nav className={styles.nav}>
            <Link to="/" activeOptions={{ exact: true }} {...navLink}>
              Overview
            </Link>
            <span className={`${styles.navLink} ${styles.navSoon}`} title="Coming soon">
              Meal Planner
            </span>
            <Link to="/menu" {...navLink}>
              Restaurants &amp; Chefs
            </Link>
            <Link to="/profile" {...navLink}>
              Wellness Profile
            </Link>
            <span className={`${styles.navLink} ${styles.navSoon}`} title="Coming soon">
              Safe Scanner
            </span>
            {/* Each kind of user gets a link to their own micro frontend */}
            {hasRole('Restaurant', 'Home-Chef') && (
              <Link to="/vendor" {...navLink}>
                Vendor portal
              </Link>
            )}
            {hasRole('Delivery Partner') && (
              <Link to="/delivery" {...navLink}>
                Deliveries
              </Link>
            )}
            {hasRole('Platform Admin') && (
              <Link to="/admin" {...navLink}>
                Admin
              </Link>
            )}
          </nav>

          <div className={styles.tools}>
            <span className={styles.secured}>
              <Icon name="verified_user" size={16} className={styles.securedIcon} />
              Secured by Entra ID
            </span>
            <button type="button" className={styles.bell} aria-label="Notifications">
              <Icon name="notifications" />
              <span className={styles.bellDot} />
            </button>
            <div className={styles.account}>
              <button
                type="button"
                className={styles.accountButton}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span className={styles.accountText}>
                  <strong>{user?.name}</strong>
                  <small>{user?.role}</small>
                </span>
                <span className={styles.avatar}>
                  <Icon name="person" size={18} />
                </span>
                <Icon name="expand_more" size={18} />
              </button>
              {menuOpen && (
                <div className={styles.accountMenu}>
                  <button type="button" onClick={signOut}>
                    <Icon name="logout" size={18} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.copyright}>
            <span className={styles.footerLogo}>
              <Icon name="psychology_alt" size={14} />
            </span>
            © 2025 SmartBite AI. Precision Culinary Intelligence.
          </div>
          <div className={styles.footerLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Dietary Compliance Standards</a>
            <a href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
