import type { ReactNode } from 'react'
import styles from './KitchenDisplay.module.css'
import { Icon } from './Icon'
import { STATS } from './data'

type StatCardProps = {
  label: string
  icon: string
  tone: 'blue' | 'green' | 'amber' | 'red'
  value: ReactNode
  children: ReactNode
}

function StatCard({ label, icon, tone, value, children }: StatCardProps) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statHeader}>
        <span className={styles.statLabel}>{label}</span>
        <span className={`${styles.statIcon} ${styles[`statIcon_${tone}`]}`}>
          <Icon name={icon} size={18} />
        </span>
      </div>
      <p className={styles.statValue}>{value}</p>
      <div className={styles.statFooter}>{children}</div>
    </div>
  )
}

export function StatCards() {
  return (
    <div className={styles.statGrid}>
      <StatCard label="Orders today" icon="receipt_long" tone="blue" value={STATS.ordersToday.value}>
        <p className={styles.trendGood}>
          <Icon name="trending_up" size={16} />
          {STATS.ordersToday.hint}
        </p>
      </StatCard>

      <StatCard label="Revenue today" icon="payments" tone="green" value={STATS.revenueToday.value}>
        <p className={styles.trendGood}>
          <Icon name="trending_up" size={16} />
          {STATS.revenueToday.hint}
        </p>
      </StatCard>

      <StatCard
        label="Average rating"
        icon="star"
        tone="amber"
        value={
          <>
            {STATS.averageRating.value}
            <Icon name="star" size={22} className={styles.ratingStar} />
          </>
        }
      >
        <p className={styles.muted}>{STATS.averageRating.hint}</p>
      </StatCard>

      <StatCard label="Items unavailable" icon="remove_shopping_cart" tone="red" value={STATS.itemsUnavailable.value}>
        <span className={styles.inlineLink}>{STATS.itemsUnavailable.hint} →</span>
      </StatCard>
    </div>
  )
}
