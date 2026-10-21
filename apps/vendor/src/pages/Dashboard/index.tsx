import { useAuth } from '@smartbite/auth'
import { formatPrice, StatCard, StatGrid } from '@smartbite/ui'
import styles from './Dashboard.module.css'

type RecentOrder = {
  id: string
  customer: string
  items: string
  total: number
  status: 'New' | 'Preparing' | 'Out for delivery' | 'Delivered'
}

// Mock data until the vendor orders API is available
const RECENT_ORDERS: RecentOrder[] = [
  { id: '1042', customer: 'Nimali P.', items: 'Quinoa Buddha Bowl ×2', total: 2900, status: 'New' },
  { id: '1041', customer: 'Kasun R.', items: 'Lentil Dhal & Brown Rice', total: 950, status: 'Preparing' },
  { id: '1039', customer: 'Ayesha M.', items: 'Grilled Chicken Salad', total: 1650, status: 'Out for delivery' },
  { id: '1036', customer: 'Dinesh W.', items: 'Salmon Poke, Quinoa Buddha Bowl', total: 3650, status: 'Delivered' },
]

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <section>
      <h2 className={styles.heading}>Welcome back{user ? `, ${user.name}` : ''}</h2>
      <p className={styles.muted}>Here's how your kitchen is doing today.</p>

      <StatGrid>
        <StatCard label="Orders today" value="18" hint="+4 vs yesterday" />
        <StatCard label="Revenue today" value={formatPrice(27450)} />
        <StatCard label="Average rating" value="4.7" hint="from 126 reviews" />
        <StatCard label="Items unavailable" value="2" hint="update in Menu" />
      </StatGrid>

      <h3>Recent orders</h3>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_ORDERS.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.items}</td>
                <td>{formatPrice(order.total)}</td>
                <td>
                  <span className={styles.status}>{order.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
