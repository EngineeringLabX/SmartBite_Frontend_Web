import type { ReactNode } from 'react'
import styles from './FullscreenLayout.module.css'

type FullscreenLayoutProps = {
  title: string
  actions?: ReactNode
  children: ReactNode
}

/** Edge-to-edge layout for wall/tablet screens such as the Kitchen Display System */
export function FullscreenLayout({ title, actions, children }: FullscreenLayoutProps) {
  return (
    <div className={styles.layout}>
      <header className={styles.topBar}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.actions}>{actions}</div>
      </header>
      {children}
    </div>
  )
}
