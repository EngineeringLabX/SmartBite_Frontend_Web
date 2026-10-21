import type { ReactNode } from 'react'
import styles from './PortalLayout.module.css'

type PortalLayoutProps = {
  title: string
  subtitle?: string
  /** Navigation links (the host passes its router's <Link>s) */
  nav: ReactNode
  /** Signed-in user + sign out, shown at the bottom of the sidebar */
  account?: ReactNode
  children: ReactNode
}

/** Desktop dashboard layout: sidebar on the backdrop, content on a white panel */
export function PortalLayout({ title, subtitle, nav, account, children }: PortalLayoutProps) {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <h1 className={styles.title}>
          {title}
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </h1>
        <nav className={styles.nav}>{nav}</nav>
        {account && <div className={styles.account}>{account}</div>}
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  )
}
