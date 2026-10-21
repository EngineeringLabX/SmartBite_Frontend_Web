import { StatCard, StatGrid } from '@smartbite/ui'
import styles from './Overview.module.css'

// Mock data until the admin / observability APIs (Epics 9, 10) are available
const ACTIVITY = [
  { id: 1, when: '2 min ago', text: 'New vendor application: Spice Route Home Kitchen' },
  { id: 2, when: '18 min ago', text: 'Allergen conflict blocked at checkout (order #1045, peanuts)' },
  { id: 3, when: '1 hr ago', text: 'Delivery partner Kamal S. completed verification' },
  { id: 4, when: '3 hr ago', text: '5 failed sign-in attempts for one account — temporarily locked' },
]

export default function Overview() {
  return (
    <section>
      <h2 className={styles.heading}>Platform overview</h2>
      <p className={styles.muted}>Today across SmartBite.</p>

      <StatGrid>
        <StatCard label="Active users" value="1,284" hint="+36 this week" />
        <StatCard label="Live vendors" value="42" hint="3 awaiting approval" />
        <StatCard label="Orders today" value="317" />
        <StatCard label="Safety blocks" value="9" hint="allergen conflicts stopped" />
      </StatGrid>

      <h3>Recent activity</h3>
      <ul className={styles.activity}>
        {ACTIVITY.map((a) => (
          <li key={a.id}>
            <span className={styles.when}>{a.when}</span>
            {a.text}
          </li>
        ))}
      </ul>
    </section>
  )
}
