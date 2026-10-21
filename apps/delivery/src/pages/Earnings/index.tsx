import { formatPrice, StatCard, StatGrid } from '@smartbite/ui'
import styles from './Earnings.module.css'

// Mock data until the delivery payouts API is available
const RECENT = [
  { id: '1036', when: 'Today, 1:10 PM', amount: 480 },
  { id: '1031', when: 'Today, 11:45 AM', amount: 390 },
  { id: '1024', when: 'Yesterday, 7:20 PM', amount: 610 },
  { id: '1019', when: 'Yesterday, 6:05 PM', amount: 450 },
]

export default function Earnings() {
  return (
    <section>
      <StatGrid>
        <StatCard label="Today" value={formatPrice(2170)} hint="5 deliveries" />
        <StatCard label="This week" value={formatPrice(11840)} hint="27 deliveries" />
      </StatGrid>

      <h2 className={styles.heading}>Recent payouts</h2>
      <ul className={styles.list}>
        {RECENT.map((p) => (
          <li key={p.id} className={styles.row}>
            <span>
              Order #{p.id}
              <span className={styles.when}>{p.when}</span>
            </span>
            <strong>{formatPrice(p.amount)}</strong>
          </li>
        ))}
      </ul>
    </section>
  )
}
