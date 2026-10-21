import type { ReactNode } from 'react'
import styles from './MobileLayout.module.css'

type MobileLayoutProps = {
  title: string
  /** Right side of the top bar, e.g. sign out */
  actions?: ReactNode
  /** Bottom tab links (the host passes its router's <Link>s) */
  tabs: ReactNode
  children: ReactNode
}

/** Mobile app layout: top bar, scrolling content, bottom tab bar */
export function MobileLayout({ title, actions, tabs, children }: MobileLayoutProps) {
  return (
    <div className={styles.layout}>
      <header className={styles.topBar}>
        <h1 className={styles.title}>{title}</h1>
        {actions}
      </header>
      <main className={styles.content}>{children}</main>
      <nav className={styles.tabs}>{tabs}</nav>
    </div>
  )
}
