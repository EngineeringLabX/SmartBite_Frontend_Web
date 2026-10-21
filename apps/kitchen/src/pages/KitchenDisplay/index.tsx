import { useState } from 'react'
import styles from './KitchenDisplay.module.css'

type TicketStatus = 'New' | 'Preparing' | 'Ready'

type Ticket = {
  id: string
  items: string[]
  channel: 'Delivery' | 'Pickup'
  minutesAgo: number
  status: TicketStatus
  allergyAlert?: string
}

// Mock data until the kitchen operations API (Epic 5) is available
const INITIAL_TICKETS: Ticket[] = [
  { id: '1044', items: ['Salmon Poke', 'Coconut Chia Pudding'], channel: 'Pickup', minutesAgo: 1, status: 'New', allergyAlert: 'Severe: tree nuts' },
  { id: '1042', items: ['Quinoa Buddha Bowl ×2'], channel: 'Delivery', minutesAgo: 4, status: 'New', allergyAlert: 'No sesame' },
  { id: '1041', items: ['Lentil Dhal & Brown Rice'], channel: 'Delivery', minutesAgo: 9, status: 'Preparing' },
  { id: '1040', items: ['Grilled Chicken Salad', 'Jackfruit Curry & Red Rice'], channel: 'Delivery', minutesAgo: 14, status: 'Preparing', allergyAlert: 'No dairy' },
  { id: '1039', items: ['Grilled Chicken Salad'], channel: 'Pickup', minutesAgo: 18, status: 'Ready' },
]

const COLUMNS: { status: TicketStatus; action: string }[] = [
  { status: 'New', action: 'Start cooking' },
  { status: 'Preparing', action: 'Mark ready' },
  { status: 'Ready', action: 'Handed over' },
]

const NEXT: Record<TicketStatus, TicketStatus | null> = { New: 'Preparing', Preparing: 'Ready', Ready: null }

export default function KitchenDisplay() {
  const [tickets, setTickets] = useState(INITIAL_TICKETS)

  // Local only for now — will sync with the kitchen operations API
  const advance = (id: string) =>
    setTickets((all) =>
      all.flatMap((t) => {
        if (t.id !== id) return [t]
        const next = NEXT[t.status]
        return next ? [{ ...t, status: next }] : []
      }),
    )

  return (
    <div className={styles.board}>
      {COLUMNS.map(({ status, action }) => {
        const column = tickets.filter((t) => t.status === status)
        return (
          <section key={status} className={styles.column}>
            <h2 className={styles.columnTitle}>
              {status} <span className={styles.count}>{column.length}</span>
            </h2>
            {column.map((ticket) => (
              <article key={ticket.id} className={`${styles.ticket} ${ticket.allergyAlert ? styles.alert : ''}`}>
                <header className={styles.ticketHeader}>
                  <strong>#{ticket.id}</strong>
                  <span>
                    {ticket.channel} · {ticket.minutesAgo} min
                  </span>
                </header>
                {ticket.allergyAlert && <p className={styles.allergy}>⚠ {ticket.allergyAlert}</p>}
                <ul className={styles.items}>
                  {ticket.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <button type="button" className={styles.action} onClick={() => advance(ticket.id)}>
                  {action}
                </button>
              </article>
            ))}
            {column.length === 0 && <p className={styles.empty}>No orders</p>}
          </section>
        )
      })}
    </div>
  )
}
