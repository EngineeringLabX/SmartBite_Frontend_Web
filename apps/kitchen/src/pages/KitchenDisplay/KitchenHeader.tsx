import { useAuth } from '@smartbite/auth'
import { useState } from 'react'
import styles from './KitchenDisplay.module.css'
import { Icon } from './Icon'
import { NAV_ITEMS } from './data'

const STAFF_LINE = 'Head Chef Marcus • Shift #1'

export function KitchenHeader() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const name = user?.name ?? 'Demo Restaurant'
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const signOut = async () => {
    await logout()
    // Full load so the shell's route guards send the user to sign-in
    window.location.assign('/login')
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.brand}>
          <span className={styles.brandLogo}>
            <Icon name="restaurant" size={22} />
          </span>
          <div>
            <div className={styles.brandRow}>
              <span className={styles.brandName}>SmartBite</span>
              <span className={styles.brandBadge}>Kitchen Ops</span>
            </div>
            <span className={styles.brandSub}>Central Culinary Station #01</span>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Kitchen sections">
          {NAV_ITEMS.map((item) =>
            item.active ? (
              <span key={item.label} className={`${styles.navItem} ${styles.navItemActive}`} aria-current="page">
                {item.label}
              </span>
            ) : (
              // Other sections are not built yet
              <span key={item.label} className={styles.navItem} title="Coming soon">
                {item.label}
              </span>
            ),
          )}
        </nav>

        <div className={styles.headerTools}>
          <span className={styles.onlinePill}>
            <span className={styles.onlineDot} />
            Kitchen Online • Accepting Orders
          </span>
          <button type="button" className={styles.bell} aria-label="Notifications">
            <Icon name="notifications" size={20} />
          </button>
          <div className={styles.account}>
            <button
              type="button"
              className={styles.accountButton}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className={styles.accountText}>
                <strong>{name}</strong>
                <small>{STAFF_LINE}</small>
              </span>
              <span className={styles.avatar}>{initials}</span>
            </button>
            {menuOpen && (
              <div className={styles.accountMenu}>
                <a href="/vendor">
                  <Icon name="storefront" size={18} />
                  Vendor portal
                </a>
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
  )
}
