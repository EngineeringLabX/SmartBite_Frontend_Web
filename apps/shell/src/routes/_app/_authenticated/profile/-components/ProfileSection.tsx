import type { ReactNode } from 'react'
import styles from './ProfileSection.module.css'

type ProfileSectionProps = {
  title: string
  description: string
  children?: ReactNode
}

export function ProfileSection({ title, description, children }: ProfileSectionProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <p className="muted">{description}</p>
      {children}
    </div>
  )
}
