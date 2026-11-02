import type { ReactNode } from 'react'
import { Icon } from './Icon'
import styles from './ProfileSection.module.css'

type ProfileSectionProps = {
  icon: string
  iconTone: 'blue' | 'red' | 'green' | 'tint' | 'solid'
  title: string
  description: string
  /** Sidebar sections use the smaller heading */
  compact?: boolean
  badge?: string
  aside?: ReactNode
  children?: ReactNode
}

export function ProfileSection({
  icon,
  iconTone,
  title,
  description,
  compact,
  badge,
  aside,
  children,
}: ProfileSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <div className={styles.heading}>
          <div className={`${styles.icon} ${styles[iconTone]}`}>
            <Icon name={icon} size={22} />
          </div>
          <div>
            <div className={styles.titleRow}>
              <h2 className={compact ? styles.titleCompact : styles.title}>{title}</h2>
              {badge && <span className={styles.badge}>{badge}</span>}
            </div>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
        {aside}
      </div>
      {children}
    </section>
  )
}
