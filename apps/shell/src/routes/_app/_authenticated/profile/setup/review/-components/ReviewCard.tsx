import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { Icon } from '../../../-components/Icon'
import type { SetupStep } from '../../-components/setupData'
import styles from '../review.module.css'

type ReviewCardProps = {
  icon: string
  title: string
  tag: string
  tagTone?: 'primary' | 'error' | 'secondary' | 'muted'
  hint: string
  /** Stage to jump back to for editing */
  editTo: NonNullable<SetupStep['to']>
  danger?: boolean
  children: ReactNode
}

/** One summary card on the review page, with an Edit link back to its stage */
export function ReviewCard({ icon, title, tag, tagTone = 'primary', hint, editTo, danger, children }: ReviewCardProps) {
  return (
    <section className={styles.card} aria-label={title}>
      <div className={styles.cardHead}>
        <div className={styles.cardTitleRow}>
          <span className={`${styles.cardIcon} ${danger ? styles.cardIconDanger : ''}`}>
            <Icon name={icon} size={22} />
          </span>
          <div>
            <div className={styles.cardTitleLine}>
              <h2>{title}</h2>
              <span className={`${styles.tag} ${styles[`tag-${tagTone}`]}`}>{tag}</span>
            </div>
            <p className={styles.cardHint}>{hint}</p>
          </div>
        </div>
        <Link to={editTo} className={styles.edit} aria-label={`Edit ${title}`}>
          <Icon name="edit" size={16} />
          Edit
        </Link>
      </div>
      {children}
    </section>
  )
}
